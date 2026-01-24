import { useBlogs } from "@/hooks/useBlogs";
import { BlogCard } from "./BlogCard";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { AlertCircle, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/ThemeToggle";

interface BlogListProps {
  selectedBlogId: number | null;
  onSelectBlog: (id: number) => void;
}

export function BlogList({ selectedBlogId, onSelectBlog }: BlogListProps) {
  const { data: blogs, isLoading, error } = useBlogs();

  const header = (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-serif text-2xl font-bold tracking-tight">Latest Posts</h2>
      <ThemeToggle />
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        {header}
        {[...Array(4)].map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        {header}
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load blogs. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex flex-col h-full p-6">
        {header}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-serif text-lg font-medium text-foreground mb-1">No blogs yet</h3>
          <p className="text-sm text-muted-foreground">
            Create your first blog post to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      {header}
      {blogs.map((blog, index) => (
        <div
          key={blog.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <BlogCard
            blog={blog}
            isSelected={selectedBlogId === blog.id}
            onClick={() => onSelectBlog(blog.id)}
          />
        </div>
      ))}
    </div>
  );
}
