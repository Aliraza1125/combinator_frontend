import React from 'react';
import { Investment } from '../../../types/startup';
import { InvestorCard } from './InvestorCard';

interface InvestorShowcaseProps {
  investments?: Investment[];
}

export function InvestorShowcase({ investments = [] }: InvestorShowcaseProps) {
  if (!investments || investments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No investment history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {investments.map((investment) => (
        <InvestorCard key={investment.id} investment={investment} />
      ))}
    </div>
  );
}