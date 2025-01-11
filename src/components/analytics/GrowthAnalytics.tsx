import React from 'react';
import { TrendingUp, Users, DollarSign } from 'lucide-react';
import { formatNumber, formatCurrency } from '../../lib/utils';

interface GrowthMetrics {
  userGrowth: {
    total: number;
    monthlyGrowth: number;
    acquisitionRate: number;
  };
  revenue: {
    total: number;
    monthlyGrowth: number;
    projectedAnnual: number;
  };
  profitability: {
    margin: number;
    timeline: string;
    burnRate: number;
  };
}

interface GrowthAnalyticsProps {
  metrics: GrowthMetrics;
  industryAverages: {
    userGrowth: number;
    revenueGrowth: number;
    profitMargin: number;
  };
}

export function GrowthAnalytics({ metrics, industryAverages }: GrowthAnalyticsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Growth Analytics</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-indigo-600" />
            <h4 className="font-semibold text-gray-900">User Growth</h4>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(metrics.userGrowth.total)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Growth</p>
              <p className="text-lg font-semibold text-gray-900">
                {metrics.userGrowth.monthlyGrowth}%
              </p>
              <div className="text-sm text-gray-500">
                Industry Avg: {industryAverages.userGrowth}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Revenue Growth</h4>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(metrics.revenue.total)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Rate</p>
              <p className="text-lg font-semibold text-gray-900">
                {metrics.revenue.monthlyGrowth}%
              </p>
              <div className="text-sm text-gray-500">
                Industry Avg: {industryAverages.revenueGrowth}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">Profitability</h4>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Profit Margin</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.profitability.margin}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Runway</p>
              <p className="text-lg font-semibold text-gray-900">
                {metrics.profitability.timeline}
              </p>
              <div className="text-sm text-gray-500">
                Industry Avg Margin: {industryAverages.profitMargin}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Projected Growth</h4>
        <div className="h-64 bg-gray-100 rounded-lg p-4">
          {/* Add chart component here */}
          <div className="flex items-center justify-center h-full text-gray-500">
            Growth projection chart will be displayed here
          </div>
        </div>
      </div>
    </div>
  );
}