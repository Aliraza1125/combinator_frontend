import React from 'react';
import { Line } from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/utils';

interface FundingEvent {
  date: string;
  amount: number;
  type: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'exit';
  valuation?: number;
  investors: string[];
}

interface FundingTrajectoryProps {
  fundingHistory: FundingEvent[];
  industryAverage: number;
  regionAverage: number;
}

export function FundingTrajectory({ fundingHistory, industryAverage, regionAverage }: FundingTrajectoryProps) {
  const totalFunding = fundingHistory.reduce((sum, event) => sum + event.amount, 0);
  const latestValuation = fundingHistory[fundingHistory.length - 1]?.valuation;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4">Funding Trajectory</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Funding</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalFunding)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Latest Valuation</p>
          <p className="text-2xl font-bold text-gray-900">
            {latestValuation ? formatCurrency(latestValuation) : 'N/A'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Funding Rounds</p>
          <p className="text-2xl font-bold text-gray-900">{fundingHistory.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {fundingHistory.map((event, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-24 flex-shrink-0">
              <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
            </div>
            <div className="flex-1 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900 capitalize">
                    {event.type.replace('-', ' ')} Round
                  </p>
                  <p className="text-sm text-gray-600">
                    {event.investors.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(event.amount)}</p>
                  {event.valuation && (
                    <p className="text-sm text-gray-600">
                      Valuation: {formatCurrency(event.valuation)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Benchmarks</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Industry Average</p>
            <p className="font-semibold text-gray-900">{formatCurrency(industryAverage)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Regional Average</p>
            <p className="font-semibold text-gray-900">{formatCurrency(regionAverage)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}