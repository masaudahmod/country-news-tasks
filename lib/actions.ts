import { getNewsFromDb, type NewsFilters } from "./news";

export async function getCountryNews(filters: NewsFilters = {}) {
  return getNewsFromDb({ country: filters.country || "us" });
}

export async function getTopHeadlines(country: string) {
  return getNewsFromDb({ country });
}

export async function getFilteredNews(filters: NewsFilters = {}) {
  return getNewsFromDb(filters);
}
