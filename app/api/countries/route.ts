import { NextResponse } from "next/server";
import { API_ENDPOINTS, getAuthHeaders } from "@/lib/api-config";

export async function GET() {
  try {
    const allCountries: Array<{ id: number; name: string }> = [];
    let nextUrl: string | null = API_ENDPOINTS.countries;

    // Fetch all pages of countries (API is paginated)
    while (nextUrl) {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      };

      const response: Response = await fetch(nextUrl, {
        method: "GET",
        headers: headers,
        // Revalidate every 5 minutes
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `Error fetching countries from API: ${response.status} ${response.statusText}`,
          errorText
        );
        // If we have some countries, return them; otherwise return error
        if (allCountries.length > 0) {
          console.warn("Partial data returned due to error on subsequent page");
          break;
        }
        return NextResponse.json(
          { error: `Failed to fetch countries: ${response.status} ${response.statusText}` },
          { status: response.status }
        );
      }

      const data = await response.json();

      // Handle paginated response structure: {count, next, previous, results: [...]}
      if (data.results && Array.isArray(data.results)) {
        allCountries.push(...data.results);
        nextUrl = data.next; // Get next page URL
      } else if (Array.isArray(data)) {
        // Fallback: if API returns array directly
        allCountries.push(...data);
        nextUrl = null;
      } else if (data.data && Array.isArray(data.data)) {
        // Fallback: if API returns {data: [...]}
        allCountries.push(...data.data);
        nextUrl = null;
      } else {
        console.warn("Unexpected response structure:", data);
        break;
      }
    }

    // Sort countries by name for better UX
    allCountries.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json(allCountries);
  } catch (error) {
    console.error("Error in countries API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}

