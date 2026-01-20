import { getNewsFromDb } from "@/lib/news";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || undefined;
  const category = searchParams.get("category") || undefined;
  const language = searchParams.get("language") || undefined;
  const dateFrom = searchParams.get("dateFrom") || undefined;
  const dateTo = searchParams.get("dateTo") || undefined;

  try {
    const news = await getNewsFromDb({
      country,
      category,
      language,
      dateFrom,
      dateTo,
    });

    if (news.length === 0) {
      return NextResponse.json(
        { message: "No news found for the given filters" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("Error fetching filtered news:", error);
    return NextResponse.json(
      { error: "Failed to fetch filtered news" },
      { status: 500 },
    );
  }
}
