import { dbConnect } from "@/lib/db";
import { News } from "@/lib/model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    const searchParams = new URL(request.url).searchParams;
    const country = searchParams.get("country") || "us";
    const category = searchParams.get("category") || "general";

    const filter: any = {};
    if (country) filter.country = country;
    if (category) filter.category = category;

    const news = await News.find(filter).sort({ publishedAt: -1 }).limit(50);

    return NextResponse.json({
        success: true,
        data: news,
    });
}