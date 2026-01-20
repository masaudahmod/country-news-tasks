"use client";

import { useState } from "react";

export default function FilterTab() {
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [source, setSource] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleFilterChange = async () => {
    const filtered = await fetch(`https://newsapi.org/v2/top-headlines/sources?&apiKey=${process.env.NEWS_API_KEY}`, {
      method: "GET",
    });
    const data = await filtered.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 p-4 rounded-md mb-6">
        <h3 className="text-lg font-bold">Filter Your News:</h3>
      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 text-orange-500 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
      </select>

      {/* Language Filter */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="px-3 text-orange-500 py-2 border rounded-md"
      >
        <option value="">All Languages</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>
      
      {/* Date Range Filter */}
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="px-3 text-orange-500 py-2 border rounded-md"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="px-3 text-orange-500 py-2 border rounded-md"
      />

      {/* Apply Button */}
      <button
        onClick={handleFilterChange}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
}
