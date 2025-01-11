import React from 'react';
import { Investment } from '../../types/startup';
import { formatCurrency, formatDate } from '../../lib/utils';
import { Building2, TrendingUp } from 'lucide-react';

interface InvestorShowcaseProps {
  investments: Investment[];
}

export function InvestorShowcase({ investments }: InvestorShowcaseProps) {
  if (investments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No investment history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {investments.map((investment) => (
        <div
          key={investment.id}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              {investment.investorLogo ? (
                <img
                  src={investment.investorLogo}
                  alt={investment.investorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {investment.investorName}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{formatCurrency(investment.amount)}</span>
                  <span>•</span>
                  <time>{formatDate(investment.date)}</time>
                </div>
              </div>
            </div>

            {investment.testimonial && (
              <blockquote className="text-gray-600 italic border-l-4 border-indigo-200 pl-4 my-4">
                "{investment.testimonial}"
              </blockquote>
            )}

            {investment.portfolio && investment.portfolio.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Other Successful Investments
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {investment.portfolio.map((company, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">
                          {company.name}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {company.description}
                        </p>
                      </div>
                      {company.exitValue && (
                        <div className="flex items-center text-green-600 text-sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {formatCurrency(company.exitValue)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}