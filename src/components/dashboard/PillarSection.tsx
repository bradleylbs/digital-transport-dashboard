"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { InitiativeCard } from './InitiativeCard';
import type { EcosystemSection } from './types';

interface PillarSectionProps {
  section: EcosystemSection;
}

export const PillarSection: React.FC<PillarSectionProps> = ({ section }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const Icon = section.pillar.icon;

  useEffect(() => {
    setIsClient(true); // Sets true only after component mounts on the client
  }, []);

  const totalProjects = section.initiatives.reduce(
    (acc, initiative) => acc + initiative.projects.length,
    0
  );

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'bg-opacity-100' : 'bg-opacity-90'
      } ${section.pillar.gradient}`}
    >
      <div
        className="p-4 cursor-pointer flex items-center group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="bg-white/10 p-2 rounded-lg mr-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-white">
            {section.pillar.title}
          </h3>
          <p className="text-white/80 text-sm">
            {section.pillar.description}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-white/80 text-sm">
            {section.initiatives.length} Initiatives • {totalProjects} Projects
          </div>
          {isExpanded ? (
            <ChevronDown className="text-white h-6 w-6" />
          ) : (
            <ChevronRight className="text-white h-6 w-6" />
          )}
        </div>
      </div>
      {/* Conditional rendering for expandable content */}
      {isClient && isExpanded && (
        <div className="pb-4">
          {section.initiatives.map((initiative, idx) => (
            <InitiativeCard key={idx} initiative={initiative} />
          ))}
        </div>
      )}
    </div>
  );
};
