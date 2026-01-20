"use server";

export async function getCountryNews() {
  try {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=country&apiKey=${process.env.NEWS_API_KEY}`,
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching country news:", error);
    throw error;
  }
}

export async function getTopHeadlines(country: string) {
  try {
    const result = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`,
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    throw error;
  }
}

export async function getFilteredNews(
  category: string,
  language: string,
  source: string,
  dateFrom: string,
  dateTo: string,
) {
  try {
    const filtered = await fetch(
      `https://newsapi.org/v2/top-headlines/sources?&apiKey=${process.env.NEWS_API_KEY}`,
      {
        method: "GET",
      },
    );
    const data = await filtered.json();
    return data;
  } catch (error) {
    console.error("Error fetching filtered news:", error);
    throw error;
  }
}
