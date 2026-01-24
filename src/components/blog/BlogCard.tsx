import { Blog } from "@/types/blog";
import { CategoryBadge } from "./CategoryBadge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
  return (
    <Card
      className={cn(
        "blog-card cursor-pointer border-0 shadow-sm",
        isSelected
          ? "ring-2 ring-accent bg-accent/5"
          : "hover:bg-secondary/50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {blog.category.map((cat) => (
            <CategoryBadge key={cat} category={cat} />
          ))}
        </div>

        <h3 className="font-serif text-xl font-semibold text-foreground mb-2 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {blog.description}
        </p>

        <time className="text-xs text-muted-foreground/70">
          {format(new Date(blog.date), "MMM d, yyyy")}
        </time>
      </CardContent>
    </Card>
  );
}
