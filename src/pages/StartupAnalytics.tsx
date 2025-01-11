import React from 'react';
import { useParams } from 'react-router-dom';
import { useStartupStore } from '../store/startupStore';
import { FundingTrajectory } from '../components/analytics/FundingTrajectory';
import { PerformanceBenchmarks } from '../components/analytics/PerformanceBenchmarks';
import { GrowthAnalytics } from '../components/analytics/GrowthAnalytics';

export function StartupAnalytics() {
  const { id } = useParams<{ id: string }>();
  const startup = useStartupStore((state) =>
    state.startups.find((s) => s.id === id)
  );

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Startup not found</p>
      </div>
    );
  }

  // Mock data for demonstration
  const mockData = {
    fundingHistory: [
      {
        date: '2023-01-15',
        amount: 500000,
        type: 'seed' as const,
        valuation: 2000000,
        investors: ['Angel Investor Group'],
      },
      {
        date: '2023-06-20',
        amount: 2000000,
        type: 'series-a' as const,
        valuation: 10000000,
        investors: ['MENA Ventures', 'Tech Fund I'],
      },
    ],
    industryAverage: 1500000,
    regionAverage: 1200000,
    performanceMetrics: {
      cac: {
        name: 'Customer Acquisition Cost',
        value: 150,
        industryAvg: 200,
        change: -25,
      },
      burnRate: {
        name: 'Monthly Burn Rate',
        value: 75000,
        industryAvg: 100000,
        change: -25,
      },
      operationalEfficiency: {
        name: 'Operational Efficiency',
        value: 85,
        industryAvg: 75,
        change: 13.3,
      },
    },
    growthMetrics: {
      userGrowth: {
        total: 50000,
        monthlyGrowth: 15,
        acquisitionRate: 2500,
      },
      revenue: {
        total: 200000,
        monthlyGrowth: 20,
        projectedAnnual: 2400000,
      },
      profitability: {
        margin: -15,
        timeline: '18 months',
        burnRate: 75000,
      },
    },
    industryAverages: {
      userGrowth: 10,
      revenueGrowth: 15,
      profitMargin: -20,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{startup.companyName} Analytics</h1>
        <p className="text-gray-600">Detailed performance metrics and growth analysis</p>
      </div>

      <div className="space-y-8">
        <FundingTrajectory
          fundingHistory={mockData.fundingHistory}
          industryAverage={mockData.industryAverage}
          regionAverage={mockData.regionAverage}
        />

        <PerformanceBenchmarks metrics={mockData.performanceMetrics} />

        <GrowthAnalytics
          metrics={mockData.growthMetrics}
          industryAverages={mockData.industryAverages}
        />
      </div>
    </div>
  );
}