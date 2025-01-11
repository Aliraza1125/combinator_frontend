import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Rocket, Users, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070"
          alt="Startup Investment"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Launch Your Startup in the
            <span className="text-indigo-600"> Middle East</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the leading startup accelerator program helping founders build the next
            generation of innovative companies in the MENA region.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/startups">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Startups
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Rocket className="w-8 h-8 text-indigo-600" />,
              title: '500+ Startups',
              description: 'Funded and accelerated across MENA',
            },
            {
              icon: <Users className="w-8 h-8 text-indigo-600" />,
              title: '2000+ Founders',
              description: 'Connected to our global network',
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
              title: '$2B+ Raised',
              description: 'By our portfolio companies',
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                {stat.icon}
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  {stat.title}
                </h3>
                <p className="mt-2 text-gray-600">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}