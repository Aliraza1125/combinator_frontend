import { create } from 'zustand';
import { NewsArticle } from '../types/news';
import { mockNews } from '../data/mockNews';

interface NewsFilters {
  search: string;
  tags: string[];
}

interface NewsStore {
  articles: NewsArticle[];
  filters: NewsFilters;
  setSearch: (search: string) => void;
  setSelectedTags: (tags: string[]) => void;
  getFilteredArticles: () => NewsArticle[];
  getAllTags: () => string[];
}

export const useNewsStore = create<NewsStore>((set, get) => ({
  articles: mockNews,
  filters: {
    search: '',
    tags: [],
  },
  setSearch: (search) => 
    set((state) => ({
      filters: { ...state.filters, search }
    })),
  setSelectedTags: (tags) =>
    set((state) => ({
      filters: { ...state.filters, tags }
    })),
  getFilteredArticles: () => {
    const { articles, filters } = get();
    return articles.filter((article) => {
      const matchesSearch = filters.search === '' || 
        article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.summary.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.content.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesTags = filters.tags.length === 0 ||
        filters.tags.some((tag) => article.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  },
  getAllTags: () => {
    const { articles } = get();
    const tags = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  },
}));