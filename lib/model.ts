import mongoose, { model, models } from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    url: { type: String },
    urlToImage: { type: String },
    publishedAt: { type: String },
    category: { type: String },
    language: { type: String },
    country: { type: String },
    content: { type: String },
    source: {
      id: { type: String, default: null },
      name: { type: String },
    },
  },
  {
    timestamps: true,
  },
);

export const News = models.News || model("News", newsSchema);
