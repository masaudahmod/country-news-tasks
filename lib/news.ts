import { dbConnect } from "./db";
import { News } from "./model";

export type NewsFilters = {
  country?: string;
  category?: string;
  language?: string;
  dateFrom?: string;
  dateTo?: string;
};

const DEFAULT_COUNTRY = "us";

const buildDbFilter = (filters: NewsFilters) => {
  const filter: Record<string, unknown> = {};
  if (filters.country) filter.country = filters.country;
  if (filters.category) filter.category = filters.category;
  if (filters.language) filter.language = filters.language;

  if (filters.dateFrom || filters.dateTo) {
    const dateRange: Record<string, string> = {};
    if (filters.dateFrom) dateRange.$gte = filters.dateFrom;
    if (filters.dateTo) dateRange.$lte = filters.dateTo;
    filter.publishedAt = dateRange;
  }

  return filter;
};

export const fetchAndStoreNews = async (filters: NewsFilters = {}) => {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.warn("NEWS_API_KEY is missing");
    return 0;
  }

  const params = new URLSearchParams({
    apiKey,
    country: filters.country || DEFAULT_COUNTRY,
  });

  if (filters.category) {
    params.set("category", filters.category);
  }


  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?${params.toString()}`,
  );
  const data = await response.json();

  if (!Array.isArray(data?.articles)) {
    return 0;
  }

  const operations = data.articles.map((article: any) => ({
    updateOne: {
      filter: { url: article.url },
      update: {
        $set: {
          author: article.author,
          title: article.title,
          description: article.description,
          urlToImage: article.urlToImage,
          url: article.url,
          publishedAt: article.publishedAt,
          content: article.content,
          category: filters.category,
          language: filters.language,
          country: filters.country || DEFAULT_COUNTRY,
          source: {
            id: article?.source?.id ?? null,
            name: article?.source?.name,
          },
        },
      },
      upsert: true,
    },
  }));

  if (operations.length > 0) {
    await News.bulkWrite(operations);
  }

  return operations.length;
};

export const getNewsFromDb = async (filters: NewsFilters = {}) => {
  await dbConnect();
  const query = buildDbFilter(filters);

  let news = await News.find(query).sort({ publishedAt: -1 }).limit(50).lean();
  if (news.length === 0) {
    await fetchAndStoreNews(filters);
    news = await News.find(query).sort({ publishedAt: -1 }).limit(50).lean();
  }

  return news;
};
