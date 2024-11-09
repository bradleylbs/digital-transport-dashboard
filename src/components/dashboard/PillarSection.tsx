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
    setIsClient(true);
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
        className="p-3 sm:p-4 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center group space-y-2 sm:space-y-0"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-grow">
          <div className="bg-white/10 p-2 rounded-lg">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
              {section.pillar.title}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
              {section.pillar.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 ml-11 sm:ml-4 text-white/80">
          <div className="text-xs sm:text-sm whitespace-nowrap">
            {section.initiatives.length} Initiatives • {totalProjects} Projects
          </div>
          <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8">
            {isExpanded ? (
              <ChevronDown className="text-white h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <ChevronRight className="text-white h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </div>
        </div>
      </div>

      {isClient && isExpanded && (
        <div className="pb-3 sm:pb-4 transition-all duration-300 ease-in-out">
          <div className="space-y-2 sm:space-y-3">
            {section.initiatives.map((initiative, idx) => (
              <InitiativeCard 
                key={idx} 
                initiative={initiative}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};