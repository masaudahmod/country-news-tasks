import NewsCard from "@/components/NewsCard";
import {
  getCountryNews,
  getFilteredNews,
  getTopHeadlines,
} from "../lib/actions";
import { NewsType } from "./types";
import SelectCountry from "@/components/SelectCountry";
import FilterTab from "@/components/FilterTab";
import Link from "next/link";

export default async function Home(searchParams: {
  searchParams: { country?: string };
}) {
  const country = searchParams.searchParams.country as string;
  console.log("country", country);
  const response = await getCountryNews();
  const articles = response?.articles;
  const headLines = await getTopHeadlines(country || "us");
  const getFilteredNewss = await getFilteredNews();
  const filteredNews = getFilteredNewss?.sources.filter((news: any) =>
    country ? news.country === country : news.country === "us",
  );
  console.log(
    "filtered news",
    filteredNews.filter((news: any) => news.language === "en"),
  );

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center py-2">
          <h1 className="text-3xl py-5 font-bold">Country - News</h1>{" "}
        </div>
        <div className="px-5 py-5 flex flex-col md:flex-row items-center justify-between">
          <Link href="/news" className="text-xl py-2">
            All News{" "}
          </Link>
          {/* <div className="flex items-center gap-5 capitalize">
            <p>search by country:</p>
            <select className="px-5 w-44 py-2 border rounded-md text-gray-300 focus:outline-none">
              <option className="text-red-600 capitalize" value="us">
                USA
              </option>
              <option className="text-red-600 capitalize" value="uk">
                uk
              </option>
              <option className="text-red-600 capitalize" value="fr">
                France
              </option>
              <option className="text-red-600 capitalize" value="de">
                Germany
              </option>
              <option className="text-red-600 capitalize" value="in">
                India
              </option>
              <option className="text-red-600 capitalize" value="ca">
                Canada
              </option>
              <option className="text-red-600 capitalize" value="au">
                Australia
              </option>
              <option className="text-red-600 capitalize" value="jp">
                Japan
              </option>
              <option className="text-red-600 capitalize" value="cn">
                China
              </option>
              <option className="text-red-600 capitalize" value="br">
                Brazil
              </option>
              <option className="text-red-600 capitalize" value="ru">
                Russia
              </option>
            </select>
          </div> */}
          <SelectCountry country={country} />
        </div>

        <div>
          <FilterTab />
        </div>

        {filteredNews.length > 0 ? (
          <>
            <h2 className="text-xl text-center font-semibold py-2 px-5">
              Filtered News
            </h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-3 mb-3">
              {filteredNews.map((article: NewsType, index: number) => (
                <div key={index} className="break-inside-avoid mb-3">
                  <NewsCard key={index} {...article} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3 mb-3">
            {articles &&
              articles?.map((article: NewsType, index: number) => (
                <div key={index} className="break-inside-avoid mb-3">
                  <NewsCard key={index} {...article} />
                </div>
              ))}
          </div>
        )}

        {country ? (
          <h2 className="text-xl text-center font-semibold py-2 px-5">
            Top Headlines - {country.toUpperCase()}
          </h2>
        ) : (
          <h2 className="text-xl text-center font-semibold py-2 px-5">
            Top Headlines - US
          </h2>
        )}
      </div>{" "}
    </>
  );
}
