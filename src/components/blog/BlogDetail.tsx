import { useBlog, useDeleteBlog } from "@/hooks/useBlogs";
import { CategoryBadge } from "./CategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { AlertCircle, BookOpen, Trash2, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface BlogDetailProps {
  blogId: number | null;
  onBlogDeleted?: () => void;
}

export function BlogDetail({ blogId, onBlogDeleted }: BlogDetailProps) {
  const { data: blog, isLoading, error } = useBlog(blogId);
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();
  const { toast } = useToast();

  const handleDelete = () => {
    if (!blog) return;
    
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(blog.id, {
        onSuccess: () => {
          toast({
            title: "Blog Deleted",
            description: "The blog post has been removed.",
          });
          if (onBlogDeleted) onBlogDeleted();
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to delete blog. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  };

  if (!blogId) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="bg-muted/50 rounded-full p-6 mb-6">
          <BookOpen className="h-12 w-12 text-muted-foreground/60" />
        </div>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
          Select a blog to read
        </h2>
        <p className="text-muted-foreground max-w-md">
          Choose a blog post from the list on the left to view its full content here.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load this blog post. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <article className="animate-slide-in-right">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8 -mt-16 relative">
        {/* Header Row: Categories & Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {blog.category.map((cat) => (
              <CategoryBadge key={cat} category={cat} />
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            {isDeleting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {blog.title}
        </h1>

        {/* Date */}
        <time className="text-sm text-muted-foreground block mb-8">
          {format(new Date(blog.date), "MMMM d, yyyy")}
        </time>

        {/* Description */}
        <p className="text-lg text-foreground/80 font-medium mb-8 border-l-4 border-accent pl-4">
          {blog.description}
        </p>

        {/* Content */}
        <div className="prose-blog text-base leading-7">
          {blog.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
