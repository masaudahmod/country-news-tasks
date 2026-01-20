import { dbConnect } from "@/lib/db";
import { News } from "@/lib/model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();

    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY is missing");
    }

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await res.json();

    if (!data.articles) {
      return NextResponse.json({ success: false, message: "No articles found" }, { status: 404 });
    }

    for (const article of data.articles) {
      // Upsert to prevent duplicates
      await News.updateOne(
        { url: article.url },
        {
          $set: {
            title: article.title,
            description: article.description,
            urlToImage: article.urlToImage,
            url: article.url,
            publishedAt: article.publishedAt,
            content: article.content,
            source: { id: article.source.id, name: article.source.name },
            
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "News fetched and stored successfully",
      count: data.articles.length,
    });
  } catch (error) {
    console.error("Error fetching and storing news:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error fetching news" },
      { status: 500 }
    );
  }
}
