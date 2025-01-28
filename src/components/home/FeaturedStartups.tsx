import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStartupStore } from '../../store/startupStore';
import { StartupCard } from '../StartupCard';

export function FeaturedStartups() {
  const startups = useStartupStore((state) => 
    state.startups
      .sort((a, b) => b.metrics.views - a.metrics.views)
      .slice(0, 3)
  );

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Startups</h2>
            <p className="mt-2 text-gray-600">
              Discover the most promising startups in our portfolio
            </p>
          </div>
          <Link
            to="/startups"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </div>
    </div>
  );
}