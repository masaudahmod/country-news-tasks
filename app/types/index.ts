export interface NewsType {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    source: {
        id: string | null;
        name: string;
    }
}

