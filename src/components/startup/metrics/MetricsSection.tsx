import React from 'react';
import { TrendingUp, Users, DollarSign, Eye } from 'lucide-react';
import { formatNumber, formatCurrency } from '../../../lib/utils';

interface Metrics {
  revenue?: number;
  users?: number;
  growth?: number;
  views: number;
}

interface MetricsSectionProps {
  metrics: Metrics;
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.revenue !== undefined && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <DollarSign className="w-8 h-8 text-green-500" />
            <span className="text-sm font-medium text-gray-500">Revenue</span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-gray-900">
            {formatCurrency(metrics.revenue)}
          </h4>
        </div>
      )}

      {metrics.users !== undefined && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-medium text-gray-500">Users</span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-gray-900">
            {formatNumber(metrics.users)}
          </h4>
        </div>
      )}

      {metrics.growth !== undefined && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-8 h-8 text-indigo-500" />
            <span className="text-sm font-medium text-gray-500">Growth</span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-gray-900">
            {metrics.growth}%
          </h4>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <Eye className="w-8 h-8 text-purple-500" />
          <span className="text-sm font-medium text-gray-500">Profile Views</span>
        </div>
        <h4 className="mt-4 text-2xl font-bold text-gray-900">
          {formatNumber(metrics.views)}
        </h4>
      </div>
    </div>
  );
}