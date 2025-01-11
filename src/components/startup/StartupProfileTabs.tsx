import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { StartupProfile } from '../../types/startup';
import { StartupUpdates } from './updates/StartupUpdates';
import { InvestorShowcase } from './investors/InvestorShowcase';
import { TeamSection } from './team/TeamSection';
import { MetricsSection } from './metrics/MetricsSection';
import { DocumentSection } from './documents/DocumentSection';

interface StartupProfileTabsProps {
  startup: StartupProfile;
}

export function StartupProfileTabs({ startup }: StartupProfileTabsProps) {
  return (
    <Tabs.Root defaultValue="updates" className="mt-8">
      <Tabs.List className="flex border-b border-gray-200 mb-6">
        <Tabs.Trigger
          value="updates"
          className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600"
        >
          Updates
        </Tabs.Trigger>
        <Tabs.Trigger
          value="investors"
          className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600"
        >
          Investors
        </Tabs.Trigger>
        <Tabs.Trigger
          value="team"
          className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600"
        >
          Team
        </Tabs.Trigger>
        <Tabs.Trigger
          value="metrics"
          className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600"
        >
          Metrics
        </Tabs.Trigger>
        <Tabs.Trigger
          value="documents"
          className="px-4 py-2 -mb-px text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:border-gray-300 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-600"
        >
          Documents
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="updates" className="focus:outline-none">
        <StartupUpdates updates={startup.updates} />
      </Tabs.Content>

      <Tabs.Content value="investors" className="focus:outline-none">
        <InvestorShowcase investments={startup.investments} />
      </Tabs.Content>

      <Tabs.Content value="team" className="focus:outline-none">
        <TeamSection members={startup.teamMembers} />
      </Tabs.Content>

      <Tabs.Content value="metrics" className="focus:outline-none">
        <MetricsSection metrics={startup.metrics} />
      </Tabs.Content>

      <Tabs.Content value="documents" className="focus:outline-none">
        <DocumentSection
          pitchDeckUrl={startup.pitchDeckUrl}
          videoUrl={startup.videoUrl}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}