import React from 'react';
import { Search } from 'lucide-react';
import { useStartupStore } from '../store/startupStore';
import { Industry, FundingStage } from '../types/startup';

const industries: Industry[] = ['fintech', 'healthtech', 'edtech', 'ecommerce', 'saas', 'ai', 'cleantech', 'other'];
const fundingStages: FundingStage[] = ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'other'];
interface StartupFiltersProps {
  filters: {
    search: string;
    industry: string;
    fundingStage: string;
    location: string;
  };
  setFilters: (filters: Partial<StartupFiltersProps['filters']>) => void;
}
export function StartupFilters({ filters, setFilters }: StartupFiltersProps) {


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search startups..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={filters.search || ''}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.industry || ''}
            onChange={(e) => setFilters({ industry: e.target.value as Industry })}
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry.charAt(0).toUpperCase() + industry.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Funding Stage</label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.fundingStage || ''}
            onChange={(e) => setFilters({ fundingStage: e.target.value as FundingStage })}
          >
            <option value="">All Stages</option>
            {fundingStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location..."
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filters.location || ''}
            onChange={(e) => setFilters({ location: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}