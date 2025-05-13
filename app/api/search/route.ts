import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const url = `https://hades.subito.it/v1/search/items?${searchParams.toString()}`;

	try {
		const response = await fetch(url, {
			headers: {
				accept: "*/*",
				"x-subito-channel": "web",
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to search items: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error searching items:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from Subito.it" },
			{ status: 500 },
		);
	}
}
