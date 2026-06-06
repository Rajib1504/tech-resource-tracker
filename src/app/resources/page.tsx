import { getRecentResources } from "@/app/actions/resource-actions";
import { ResourceCard } from "@/components/resource-card";
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {resources.map((resource, i) => (
                <ResourceCard key={resource.id} resource={resource} index={i} />
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
