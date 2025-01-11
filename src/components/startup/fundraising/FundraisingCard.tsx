import React from 'react';
import { DollarSign, Users, Target } from 'lucide-react';
import { Button } from '../../ui/Button';
import { formatCurrency } from '../../../lib/utils';
import { useToast } from '../../../hooks/useToast';

interface FundraisingProps {
  startupId: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  description: string;
}

export function FundraisingCard({ goal, raised, backers, daysLeft, description }: FundraisingProps) {
  const { toast } = useToast();
  const progress = (raised / goal) * 100;

  const handleDonate = () => {
    // In a real app, this would open a payment modal/form
    toast({
      title: "Coming Soon",
      description: "Payment integration will be available soon!",
      duration: 3000,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Fundraising Campaign</h2>
      
      <div className="space-y-4">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-100">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {progress.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-50">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(raised)}</p>
            <p className="text-sm text-gray-500">raised of {formatCurrency(goal)}</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{backers}</p>
            <p className="text-sm text-gray-500">backers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{daysLeft}</p>
            <p className="text-sm text-gray-500">days left</p>
          </div>
        </div>

        <p className="text-gray-600">{description}</p>

        <Button 
          onClick={handleDonate} 
          className="w-full flex items-center justify-center space-x-2"
        >
          <DollarSign className="w-4 h-4" />
          <span>Back this project</span>
        </Button>
      </div>
    </div>
  );
}