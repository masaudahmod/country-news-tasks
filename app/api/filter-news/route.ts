import { dbConnect } from "@/lib/db";
import { News } from "@/lib/model";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const category = searchParams.get("category");

  if (!country || !category) {
    return Response.json(
      { error: "Country and category are required" },
      { status: 400 },
    );
  }

  try {
    await dbConnect();

    const news = await News.find({ country, category });
    if (!news) {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?&apiKey=${process.env.NEWS_API_KEY}`,
      );
      const result = await data.json();
      const storeNews = await News.create(result?.sources);
      storeNews.save();
      const filteredNews = await storeNews.aggregate([
        { $match: { country: country, category: category } },
      ]);
      return Response.json({
        success: true,
        filterNew: filteredNews,
        data: storeNews,
      });
    }
    if (news.length === 0) {
      return Response.json(
        { message: "No news found for the given filters" },
        { status: 404 },
      );
    }

    return Response.json(news);
  } catch (error) {
    console.error("Error fetching filtered news:", error);
    return Response.json(
      { error: "Failed to fetch filtered news" },
      { status: 500 },
    );
  }
}
