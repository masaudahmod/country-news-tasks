import { NewsType } from "@/app/types";
import Link from "next/link";

export default function NewsCard(news: NewsType) {
  return (
    <div className="border hover:rounded-xl transition-all duration-300 cursor-pointer rounded p-4 mb-4">
        <div className="overflow-hidden">

      {news.urlToImage && (
        <img
          src={news.urlToImage || "/placeholder.png"}
          alt={news.title}
          className="mb-4 w-full"
        />
      )}
        </div>
      <h3 className="text-lg font-bold"><span>title:</span>{news.title}</h3>
      <p className="text-gray-600"><span>description:</span>{news.description}</p>
      <div className="mt-2 flex justify-between">

      <p><span>Channel Name: </span>{news.source.name}</p>
      <Link className="text-blue-600 underline capitalize" href={news.url}>source page </Link>
      </div>

      <p className="text-gray-500 text-sm mt-2">{news.publishedAt}</p>
    </div>
  );
}
