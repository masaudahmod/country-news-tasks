import { NewsType } from "@/app/types";

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
      <h3 className="text-lg font-bold">{news.title}</h3>
      <p className="text-gray-600">{news.description}</p>
      <p className="text-gray-500 text-sm mt-2">{news.publishedAt}</p>
    </div>
  );
}
