"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import type { Initiative, Project } from './types';

// Base percentages for each phase
const basePercentages = {
  'Initiation Phase': 20,
  'Planning Phase': 40,
  'Execution Phase': 60,
  'Monitoring and Controlling': 80,
  'Closure': 100
};

const getProgressPercentage = (phase: keyof typeof basePercentages, status: string) => {

  // Get base percentage for the phase
  const basePercentage = basePercentages[phase] || 0;

  // Additional progress based on status
  let additionalProgress = 0;

  if (status.toLowerCase().includes('completed') || status.toLowerCase().includes('in operation')) {
    additionalProgress = 20;
  } else if (status.toLowerCase().includes('testing') || status.toLowerCase().includes('pilot')) {
    additionalProgress = 15;
  } else if (status.toLowerCase().includes('development') || status.toLowerCase().includes('in progress')) {
    additionalProgress = 10;
  } else if (status.toLowerCase().includes('review') || status.toLowerCase().includes('pending approval')) {
    additionalProgress = 5;
  }

  return Math.min(basePercentage + additionalProgress, 100);
};

const ProgressBar: React.FC<{ percentage: number; phase: string }> = ({ percentage, phase }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getPhaseDescription = (phase: string) => {
    switch (phase) {
      case 'Initiation Phase':
        return 'Define project goals, timeline, budget, and scope (20%)';
      case 'Planning Phase':
        return 'Create detailed action plan and prepare resources (40%)';
      case 'Execution Phase':
        return 'Carry out plans to deliver the product (60%)';
      case 'Monitoring and Controlling':
        return 'Track progress and adjust work as needed (80%)';
      case 'Closure':
        return 'Wrap up tasks and obtain project acceptance (100%)';
      default:
        return '';
    }
  };

  return (
    <div className="w-full mt-2">
      <motion.div 
        className="bg-gray-700 rounded-full h-2 cursor-pointer relative"
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        <motion.div 
          className={`h-full rounded-full ${
            percentage >= 80 ? 'bg-green-500' :
            percentage >= 60 ? 'bg-blue-500' :
            percentage >= 40 ? 'bg-yellow-500' :
            'bg-orange-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 p-2 rounded-lg shadow-lg text-xs text-white whitespace-nowrap z-10"
            >
              {getPhaseDescription(phase)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="grid grid-cols-5 gap-0.5 mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {['Initiation', 'Planning', 'Execution', 'Monitoring', 'Closure'].map((phase, index) => (
          <motion.div
            key={phase}
            className={`text-xs text-center ${
              percentage >= (index + 1) * 20 ? 'text-green-400' : 'text-gray-500'
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {phase}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  if (status.toLowerCase().includes('operation') || status.toLowerCase().includes('completed')) {
    return 'text-green-400';
  }
  if (status.toLowerCase().includes('pending') || status.toLowerCase().includes('awaiting')) {
    return 'text-yellow-400';
  }
  if (status.toLowerCase().includes('research') || status.toLowerCase().includes('development')) {
    return 'text-blue-400';
  }
  return 'text-gray-400';
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusInfo = (status: string) => {
    if (status.toLowerCase().includes('operation')) {
      return { icon: CheckCircle, color: 'text-green-400' };
    }
    if (status.toLowerCase().includes('pending')) {
      return { icon: Clock, color: 'text-yellow-400' };
    }
    if (status.toLowerCase().includes('research')) {
      return { icon: ArrowUpRight, color: 'text-blue-400' };
    }
    return { icon: AlertCircle, color: 'text-gray-400' };
  };

  const { icon: Icon, color } = getStatusInfo(status);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 ${color}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs whitespace-nowrap">Current Status</span>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = getProgressPercentage(project.phase, project.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 p-4 rounded-md hover:bg-white/10 transition-all"
    >
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="text-white/90 font-medium flex items-center gap-2">
              {project.name}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>
            <div className="text-sm text-white/70 mt-1">{project.description}</div>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <ProgressBar percentage={progress} phase={project.phase} />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            <div className="bg-white/5 rounded-lg p-3">
              <h4 className="text-sm font-medium text-white/80">Project Details</h4>
              <dl className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Current Phase</dt>
                  <dd className="text-white">{project.phase}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Status</dt>
                  <dd className={`${getStatusColor(project.status)}`}>{project.status}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Progress</dt>
                  <dd className="text-white">{progress}%</dd>
                </div>
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const InitiativeCard: React.FC<{ initiative: Initiative }> = ({ initiative }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = initiative.icon;
  
  return (
    <motion.div
      layout
      className="ml-8 mb-3"
    >
      <motion.div 
        className="bg-white/10 p-3 rounded-md cursor-pointer flex items-center group hover:bg-white/20 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Icon className="mr-2 h-5 w-5 text-white/80" />
        <span className="text-white font-medium flex-grow">{initiative.name}</span>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">
            {initiative.projects.length} Projects
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-white/80 h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-6 mt-2 space-y-2"
          >
            {initiative.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};