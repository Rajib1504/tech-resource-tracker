import { getRecentResources } from "@/app/actions/resource-actions";
import { Link2, Code2, ExternalLink } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata = {
  title: "All Resources | DevVault",
  description: "Browse all resources in the developer vault.",
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = parseInt((params?.page as string) || "1", 10);
  const limit = 12;
  const skip = (page - 1) * limit;

  const { resources, total } = await getRecentResources(limit, skip);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-32 relative z-10 flex-grow">
        <div className="flex flex-col space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">Resources</span>
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl font-mono">
            Browse the entire vault of community-curated links and snippets.
            Showing page {page} of {totalPages || 1}.
          </p>
        </div>

        {resources.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border/50 rounded-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            <p className="text-muted-foreground font-mono">No resources found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="group flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-[4px_4px_0_0_rgba(99,102,241,0.2)] transition-all relative"
                >
                  <div className="h-40 bg-muted relative overflow-hidden flex items-center justify-center border-b border-border/50">
                    {resource.thumbnailUrl ? (
                      <img
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-muted/50 to-background">
                        {resource.type === "LINK" ? (
                          <Link2 className="w-10 h-10 text-muted-foreground/30" />
                        ) : (
                          <Code2 className="w-10 h-10 text-muted-foreground/30" />
                        )}
                      </div>
                    )}
                    {resource.category && (
                      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border/50 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider text-primary shadow-sm">
                        {resource.category.name}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                      {resource.type === "LINK" ? (
                        <Link2 className="w-3.5 h-3.5 text-indigo-400" />
                      ) : (
                        <Code2 className="w-3.5 h-3.5 text-green-400" />
                      )}
                      <span className="font-mono">
                        {new Date(resource.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground line-clamp-2 text-base mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    {resource.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
                        {resource.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold overflow-hidden border border-primary/20">
                          {resource.user?.imageUrl ? (
                            <img
                              src={resource.user.imageUrl}
                              alt="user"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            resource.user?.name?.[0]?.toUpperCase() || "U"
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground font-mono truncate max-w-[100px]">
                          {resource.user?.name || "Unknown"}
                        </span>
                      </div>
                      {resource.type === "LINK" && resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary/10 text-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 font-mono">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      {page > 1 ? (
                        <PaginationPrevious href={`/resources?page=${page - 1}`} />
                      ) : (
                        <span className="opacity-50 cursor-not-allowed px-4 py-2 flex items-center gap-1">
                          Previous
                        </span>
                      )}
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      // Simple logic to show current, first, last, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href={`/resources?page=${pageNum}`}
                              isActive={page === pageNum}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Render ellipses if there's a gap
                      if (pageNum === page - 2 || pageNum === page + 2) {
                        return <PaginationItem key={pageNum}><span className="px-4">...</span></PaginationItem>;
                      }
                      
                      return null;
                    })}

                    <PaginationItem>
                      {page < totalPages ? (
                        <PaginationNext href={`/resources?page=${page + 1}`} />
                      ) : (
                        <span className="opacity-50 cursor-not-allowed px-4 py-2 flex items-center gap-1">
                          Next
                        </span>
                      )}
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
