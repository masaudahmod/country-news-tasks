import { fetchAndStoreNews } from "@/lib/news";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "us";
    const category = searchParams.get("category") || undefined;
    const language = searchParams.get("language") || undefined;

    const count = await fetchAndStoreNews({ country, category, language });

    if (!count) {
      return NextResponse.json(
        { success: false, message: "No articles found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "News fetched and stored successfully",
      count,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error fetching news";
    console.error("Error fetching and storing news:", error);
    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
