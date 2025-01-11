import React from 'react';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface Metric {
  name: string;
  value: number;
  industryAvg: number;
  change: number;
}

interface PerformanceBenchmarksProps {
  metrics: {
    cac: Metric;
    burnRate: Metric;
    operationalEfficiency: Metric;
  };
}

export function PerformanceBenchmarks({ metrics }: PerformanceBenchmarksProps) {
  const formatMetric = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-6">Performance Benchmarks</h3>

      <div className="space-y-6">
        {Object.entries(metrics).map(([key, metric]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">{metric.name}</h4>
                <p className="text-sm text-gray-600">Industry Average: {formatMetric(metric.industryAvg)}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                metric.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {formatPercentage(metric.change)}
              </span>
            </div>

            <div className="relative pt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Current: {formatMetric(metric.value)}</span>
                <span>Target: {formatMetric(metric.industryAvg)}</span>
              </div>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    metric.value <= metric.industryAvg ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      (metric.value / metric.industryAvg) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}