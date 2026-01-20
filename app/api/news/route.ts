import { getNewsFromDb } from "@/lib/news";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const country = searchParams.get("country") || "us";
  const category = searchParams.get("category") || undefined;
  const language = searchParams.get("language") || undefined;
  const dateFrom = searchParams.get("dateFrom") || undefined;
  const dateTo = searchParams.get("dateTo") || undefined;

  const news = await getNewsFromDb({
    country,
    category,
    language,
    dateFrom,
    dateTo,
  });

  return NextResponse.json({
    success: true,
    data: news,
  });
}