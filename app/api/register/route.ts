import { NextResponse } from "next/server";
import { API_ENDPOINTS, getAuthHeaders } from "@/lib/api-config";

export async function POST(request: Request) {
  try {
    // Get the content-type header to preserve the boundary for multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    
    // Read the body as array buffer and convert to Buffer for reliable forwarding
    const arrayBuffer = await request.arrayBuffer();
    const body = Buffer.from(arrayBuffer);

    // Prepare headers for the external API
    const headers: HeadersInit = {
      // Preserve the content-type with boundary for multipart/form-data
      "Content-Type": contentType,
      ...getAuthHeaders(),
    };

    const response = await fetch(API_ENDPOINTS.detailedRegistrations, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      let errorMessage = `Failed to submit registration: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage =
          errorData.message || errorData.detail || JSON.stringify(errorData);
      } catch (parseError) {
        const errorText = await response.text();
        if (errorText) {
          errorMessage = errorText;
        }
      }
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    const responseContentType = response.headers.get("content-type");
    if (responseContentType && responseContentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      return NextResponse.json({ success: true, message: text || "Registration submitted successfully" });
    }
  } catch (error) {
    console.error("Error in registration API route:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit registration" },
      { status: 500 }
    );
  }
}

