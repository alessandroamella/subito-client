import type { SubitoApiResponse } from "@/types/api-response";

export async function getFilters() {
  try {
    const response = await fetch(
      "https://hades.subito.it/v1/search/categories/0/ad_types/s/filters",
      {
        headers: {
          accept: "*/*",
          "x-subito-channel": "web",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch filters: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filters:", error);
    return { filters: [] };
  }
}

export async function searchItems(params: URLSearchParams): Promise<SubitoApiResponse> {
  try {
    const url = `https://hades.subito.it/v1/search/items?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        accept: "*/*",
        "x-subito-channel": "web",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      },
      next: { revalidate: 60 } // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`Failed to search items: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching items:", error);
    return { count_all: 0, ads: [], lines: 0, start: 0 };
  }
}
