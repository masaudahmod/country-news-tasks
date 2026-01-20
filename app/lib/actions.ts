"use server";

export async function getCountryNews() {
  try {
    console.log("Fetching country news...");
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
    console.log("Fetching top headlines...");
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
