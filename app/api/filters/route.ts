import { NextResponse } from "next/server";

export async function GET() {
	try {
		const response = await fetch(
			"https://hades.subito.it/v1/search/categories/0/ad_types/s/filters",
			{
				headers: {
					accept: "*/*",
					"x-subito-channel": "web",
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch filters: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching filters:", error);
		return NextResponse.json(
			{ error: "Failed to fetch filters from Subito.it" },
			{ status: 500 },
		);
	}
}
