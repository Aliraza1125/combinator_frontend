import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { useNewsStore } from '../store/newsStore';
import { formatDate } from '../lib/utils';

export function NewsPage() {
  const { getFilteredArticles, getAllTags, filters, setSearch, setSelectedTags } = useNewsStore();
  const articles = getFilteredArticles();
  const allTags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4 sticky top-24">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Topics</h3>
              <div className="space-y-2">
                {allTags.map((tag) => (
                  <label key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...filters.tags, tag]);
                        } else {
                          setSelectedTags(filters.tags.filter((t) => t !== tag));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-600 capitalize">{tag.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Startup News</h1>
          <div className="space-y-6">
            {articles.length > 0 ? (
              articles.map((article) => (
                <a
                  key={article.id}
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-64 flex-shrink-0">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-48 w-full object-cover md:h-full"
                        />
                      </div>
                      <div className="p-6 flex-1">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                          <span className="mx-2">•</span>
                          <span>{article.source}</span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 mb-2">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-4">{article.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full capitalize"
                            >
                              {tag.replace('-', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No articles found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}