import React from 'react';
import {
  Rocket,
  Users,
  DollarSign,
  Building,
  Globe,
  Lightbulb,
} from 'lucide-react';

export function ProgramBenefits() {
  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6 text-indigo-600" />,
      title: '$500K Investment',
      description:
        'Receive initial funding to kickstart your growth in exchange for 7% equity.',
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: 'Mentorship Network',
      description:
        'Access to experienced founders, industry experts, and technical advisors.',
    },
    {
      icon: <Building className="w-6 h-6 text-indigo-600" />,
      title: 'Office Space',
      description:
        'Free co-working space in major MENA tech hubs during the program.',
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      title: 'Global Network',
      description:
        'Connect with founders and investors from Silicon Valley to Dubai.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
      title: 'Workshops & Training',
      description:
        'Weekly sessions on product, growth, sales, and fundraising.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-indigo-600" />,
      title: 'Demo Day',
      description:
        'Present to top regional and international investors at our demo day.',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Program Benefits
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to scale your startup in the Middle East
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}