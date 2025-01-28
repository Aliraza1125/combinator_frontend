import React, { useEffect, useState } from 'react';
import { StartupFilters } from '../components/StartupFilters';
import { StartupCard } from '../components/StartupCard';
import useAxios from '../hooks/useAxios';
import { Loader2 } from 'lucide-react';

interface Application {
  _id: string;
  companyName: string;
  industry: string;
  location: string;
  teamSize: number;
  pitch: string;
  fundingStage: string;
  logo: string;
  banner: string;
  status: string;
  views?: {
    total: number;
    unique: number;
  };
}

export function StartupListings() {
  const [startups, setStartups] = useState<Application[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Application[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    industry: '',
    fundingStage: '',
    location: ''
  });
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
      
      // Filter only approved applications and ensure they have required image fields
      const approvedStartups = response.applications
        .filter((app: Application) => app.status === 'approved')
        .map((app: Application) => ({
          ...app,
          logo: app.logo || '/default-logo.png',
          banner: app.banner || '/default-banner.png',
          views: app.views || { total: 0, unique: 0 }
        }));

      setStartups(approvedStartups);
      setFilteredStartups(approvedStartups);
    } catch (error) {
      console.error('Failed to fetch startups:', error);
    }
  };

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = startups.filter(startup => {
      const matchesSearch = startup.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
                          startup.pitch.toLowerCase().includes(filters.search.toLowerCase());
      const matchesIndustry = !filters.industry || startup.industry === filters.industry;
      const matchesFundingStage = !filters.fundingStage || startup.fundingStage === filters.fundingStage;
      const matchesLocation = !filters.location || 
                            startup.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesIndustry && matchesFundingStage && matchesLocation;
    });

    // Sort by views (most viewed first) if no search filters are active
    if (!filters.search && !filters.industry && !filters.fundingStage && !filters.location) {
      filtered.sort((a, b) => (b.views?.total || 0) - (a.views?.total || 0));
    }

    setFilteredStartups(filtered);
  }, [filters, startups]);

  if (isLoading && startups.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-64 flex-shrink-0">
          <StartupFilters filters={filters} setFilters={setFilters} />
        </div>
        
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Featured Startups</h1>
            <p className="text-gray-600">Discover innovative startups from the Middle East</p>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              Failed to load startups. Please try again later.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard 
                key={startup._id} 
                startup={startup}
              />
            ))}
          </div>
          
          {filteredStartups.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500">No startups found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}