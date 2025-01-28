import React from 'react';
import { Search } from 'lucide-react';

// Define proper types
type Industry = 'fintech' | 'healthtech' | 'edtech' | 'ecommerce' | 'saas' | 'ai' | 'cleantech' | 'other';
type FundingStage = 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c';

interface Filters {
  search: string;
  industry: string;
  fundingStage: string;
  location: string;
}

interface StartupFiltersProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// Constants
const INDUSTRIES: Industry[] = [
  'fintech',
  'healthtech',
  'edtech',
  'ecommerce',
  'saas',
  'ai',
  'cleantech',
  'other'
];

const FUNDING_STAGES: FundingStage[] = [
  'pre-seed',
  'seed',
  'series-a',
  'series-b',
  'series-c'
];

export function StartupFilters({ filters, setFilters }: StartupFiltersProps) {
  // Handler for updating individual filter values
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  // Format text for display
  const formatText = (text: string) => {
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search startups..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry} value={industry}>
                {formatText(industry)}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Stage Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funding Stage
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={filters.fundingStage}
            onChange={(e) => handleFilterChange('fundingStage', e.target.value)}
          >
            <option value="">All Stages</option>
            {FUNDING_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {formatText(stage)}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter location..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>

        {/* Reset Filters Button */}
        {(filters.search || filters.industry || filters.fundingStage || filters.location) && (
          <button
            onClick={() => setFilters({
              search: '',
              industry: '',
              fundingStage: '',
              location: ''
            })}
            className="w-full py-2 px-4 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}