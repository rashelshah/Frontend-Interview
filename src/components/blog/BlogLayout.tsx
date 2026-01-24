import { useState } from "react";
import { BlogList } from "./BlogList";
import { BlogDetail } from "./BlogDetail";
import { CreateBlogForm } from "./CreateBlogForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function BlogLayout() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const handleSelectBlog = (id: number) => {
    setSelectedBlogId(id);
  };

  const handleBack = () => {
    setSelectedBlogId(null);
  };

  // Mobile: Show either list or detail
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            {selectedBlogId ? (
              <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <h1 className="font-serif text-xl font-semibold">Blog</h1>
              </div>
            )}
            {!selectedBlogId && <CreateBlogForm />}
          </div>
        </header>

        {/* Content */}
        {selectedBlogId ? (
          <BlogDetail blogId={selectedBlogId} />
        ) : (
          <BlogList selectedBlogId={selectedBlogId} onSelectBlog={handleSelectBlog} />
        )}
      </div>
    );
  }

  // Desktop: Split view
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Blog List */}
      <div className="w-[420px] flex-shrink-0 border-r bg-card flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-accent" />
            <h1 className="font-serif text-2xl font-semibold">Blog</h1>
          </div>
          <CreateBlogForm />
        </header>

        {/* Blog List */}
        <ScrollArea className="flex-1 scrollbar-thin">
          <BlogList selectedBlogId={selectedBlogId} onSelectBlog={handleSelectBlog} />
        </ScrollArea>
      </div>

      {/* Right Panel - Blog Detail */}
      <div className="flex-1 bg-background">
        <ScrollArea className="h-screen scrollbar-thin">
          <BlogDetail blogId={selectedBlogId} />
        </ScrollArea>
      </div>
    </div>
  );
}
