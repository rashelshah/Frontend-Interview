import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryStyles: Record<string, string> = {
  TECH: "bg-badge-tech/15 text-badge-tech",
  FINANCE: "bg-badge-finance/15 text-badge-finance",
  LIFESTYLE: "bg-badge-lifestyle/15 text-badge-lifestyle",
  ENVIRONMENT: "bg-badge-environment/15 text-badge-environment",
  PRODUCTIVITY: "bg-badge-productivity/15 text-badge-productivity",
  CAREER: "bg-badge-career/15 text-badge-career",
  AI: "bg-badge-ai/15 text-badge-ai",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const style = categoryStyles[category.toUpperCase()] || "bg-badge-default/15 text-badge-default";

  return (
    <span
      className={cn(
        "category-badge",
        style,
        className
      )}
    >
      {category}
    </span>
  );
}
