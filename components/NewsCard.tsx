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
      {news?.title && (
        <h3 className="text-lg font-bold">
          <span>title:</span>
          {news?.title}
        </h3>
      )}
      {news?.description && (
        <p className="text-gray-600">{news?.description}</p>
      )}
      <div className="mt-2">
        {news?.source && (
          <div className=" flex justify-between">
            <p>
              <span>Channel Id: </span>
              {news?.source.id}
            </p>
            <Link
              className="text-blue-600 underline capitalize"
              href={news?.url}
            >
              source page{" "}
            </Link>
          </div>
        )}
      </div>
      {news?.content && <p className="text-gray-600">{news?.content}</p>}
      {news?.category && <p className="text-gray-600">{news?.category}</p>}
      {news?.author && (
        <p className="text-gray-500 text-sm mt-2">
          <span>Author: </span>
          {news?.author}
          </p>
      )}
      {news.language && (
        <p className="text-gray-500 text-sm mt-2">
          <span>Language: </span>
          {news?.language}
        </p>
      )}
      <p className="text-gray-500 text-sm mt-2">{news?.publishedAt}</p>
    </div>
  );
}
