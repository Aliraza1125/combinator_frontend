import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { StartupCard } from '../StartupCard';
import useAxios from '../../hooks/useAxios';

export function FeaturedStartups() {
  const [startups, setStartups] = useState([]);
  const { isLoading, error, execute } = useAxios();

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const response = await execute({
        method: 'GET',
        url: '/api/applications'
      });
      
      // Filter approved startups and sort by views
      const filteredStartups = response.applications
        .filter((app) => app.status === 'approved')
        .sort((a, b) => {
          const aViews = a.views?.total || 0;
          const bViews = b.views?.total || 0;
          return bViews - aViews;
        })
        .slice(0, 3); // Get top 3

      setStartups(filteredStartups);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600">Failed to load featured startups.</p>
          </div>
        </div>
      </div>
    );
  }

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
            <StartupCard
              key={startup._id}
              startup={{
                _id: startup._id,
                companyName: startup.companyName,
                industry: startup.industry,
                location: startup.location,
                teamSize: startup.teamSize,
                pitch: startup.pitch,
                fundingStage: startup.fundingStage,
                logo: startup.logo,
                banner: startup.banner,
                views: {
                  total: startup.views?.total || 0,
                  unique: startup.views?.uniqueUsers?.length || 0
                }
              }}
            />
          ))}
        </div>

        {startups.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured startups available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}