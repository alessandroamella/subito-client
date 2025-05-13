import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { searchItems } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SearchResults({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = new URLSearchParams();

  // Always include t=s (for sale items)
  params.set("t", "s");

  // Add all search params to the API request
  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && key !== "priceMin" && key !== "priceMax") {
      params.set(key, Array.isArray(value) ? value[0] : value);
    }
  }

  // Handle price filter
  if (searchParams.priceMin || searchParams.priceMax) {
    const min = searchParams.priceMin ? searchParams.priceMin : "0";
    const max = searchParams.priceMax ? searchParams.priceMax : "";
    params.set("ps", Array.isArray(min) ? min[0] : min);
    if (max) {
      params.set("pe", Array.isArray(max) ? max[0] : max);
    }
  }

  const results = await searchItems(params);
  const currentPage = searchParams.start
    ? Math.floor(Number(searchParams.start) / Number(searchParams.lim || 30)) + 1
    : 1;
  const totalPages = Math.ceil(results.count_all / Number(searchParams.lim || 30));

  if (results.ads.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <h2 className="text-xl font-semibold mb-2">No results found</h2>
        <p className="text-muted-foreground">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{results.count_all} Results</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.ads.map(ad => {
          const price =
            ad.features.find(f => f.uri === "/price")?.values[0]?.value || "Price not specified";
          const condition = ad.features.find(f => f.uri === "/item_condition")?.values[0]?.value;
          const hasShipping =
            ad.features.find(f => f.uri === "/item_shippable")?.values[0]?.value === "Sì";

          // Get the best image URL
          let imageUrl = "/placeholder.svg?height=300&width=400";
          if (ad.images && ad.images.length > 0) {
            const bigImage = ad.images[0].scale.find(img => img.size === "big");
            const galleryImage = ad.images[0].scale.find(img => img.size === "gallery");
            imageUrl = (bigImage || galleryImage)?.uri || imageUrl;
          }

          return (
            <Link
              href={ad.urls.default}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-[1.01]"
              key={ad.urn}
            >
              <Card className="overflow-hidden h-full">
                <div className="relative h-48">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={ad.subject}
                    fill
                    className="object-cover"
                  />
                  {hasShipping && (
                    <Badge className="absolute top-2 right-2 rounded-full p-2 aspect-square bg-green-500">
                      <Truck className="w-4 h-4" />
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">{ad.subject}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {ad.geo.region.value}, {ad.geo.city.value}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <p className="font-bold text-lg">{price}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(ad.dates.display_iso8601)}
                    </p>
                  </div>
                  {condition && (
                    <p className="text-sm mb-3">
                      <span className="font-medium">Condition:</span> {condition}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?${createPaginationUrl(
                    searchParams,
                    (currentPage - 2) * Number(searchParams.lim || 30)
                  )}`}
                />
              </PaginationItem>
            )}

            {generatePaginationItems(currentPage, totalPages).map((page, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <PaginationItem key={page + i}>
                {page === "..." ? (
                  <span className="px-4 py-2">...</span>
                ) : (
                  <PaginationLink
                    href={`?${createPaginationUrl(
                      searchParams,
                      (Number(page) - 1) * Number(searchParams.lim || 30)
                    )}`}
                    isActive={currentPage === Number(page)}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`?${createPaginationUrl(
                    searchParams,
                    currentPage * Number(searchParams.lim || 30)
                  )}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

function createPaginationUrl(
  searchParams: { [key: string]: string | string[] | undefined },
  start: number
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined && key !== "start") {
      params.set(key, Array.isArray(value) ? value[0] : value);
    }
  }

  params.set("start", start.toString());
  return params.toString();
}

function generatePaginationItems(currentPage: number, totalPages: number) {
  const items = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      items.push(i.toString());
    }
  } else {
    items.push("1");

    if (currentPage > 3) {
      items.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i.toString());
    }

    if (currentPage < totalPages - 2) {
      items.push("...");
    }

    items.push(totalPages.toString());
  }

  return items;
}
