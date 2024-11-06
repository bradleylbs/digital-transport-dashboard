"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PillarSection } from './PillarSection';
import type { EcosystemSection } from './types';
import { 
  Search, 
  Filter, 
  BarChart2, 
  Users, 
  Car, 
  Bus, 
  TrafficCone,
  HardHat as Construction,
  Cloud,
  Smartphone, 
  CreditCard, 
  FileText,
  AlertTriangle, 
  Navigation,
  Ticket as TicketIcon,
  Route,
  Activity, 
  Map, 
  Wrench as Tool,
  ClipboardCheck, 
  UserCog,
  ChevronDown
} from 'lucide-react';

// ... your ecosystem data remains the same ...

export function DigitalTransportEcosystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [showStats, setShowStats] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  // Filter function
  const filteredEcosystem = ecosystem.map(section => ({
    ...section,
    initiatives: section.initiatives.map(initiative => ({
      ...initiative,
      projects: initiative.projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedPhase || project.phase === selectedPhase)
      )
    })).filter(initiative => initiative.projects.length > 0)
  })).filter(section => section.initiatives.length > 0);

  // Calculate statistics
  const stats = {
    total: ecosystem.reduce((acc, section) => 
      acc + section.initiatives.reduce((acc2, init) => 
        acc2 + init.projects.length, 0), 0),
    byPhase: ecosystem.reduce((acc, section) => {
      section.initiatives.forEach(init => 
        init.projects.forEach(proj => {
          acc[proj.phase] = (acc[proj.phase] || 0) + 1;
        }));
      return acc;
    }, {} as Record<string, number>),
    byPillar: ecosystem.reduce((acc, section) => {
      acc[section.pillar.title] = section.initiatives.reduce(
        (acc2, init) => acc2 + init.projects.length, 0
      );
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Card className="w-full max-w-5xl bg-gray-900 shadow-xl">
        <CardHeader className="border-b border-gray-800">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-3xl text-center text-white">
              Digital Transport Ecosystem
            </CardTitle>
            <p className="text-center text-gray-400 mt-2">
              Integrated Digital Mobility Solutions for Modern Transportation
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div 
            className="mt-6 space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex gap-4 flex-wrap">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
              </div>

              {/* Phase Filter */}
              <motion.div 
                className="relative min-w-[200px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value)}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                  <option value="">All Phases</option>
                  <option value="Initiation Phase">Initiation</option>
                  <option value="Planning Phase">Planning</option>
                  <option value="Execution Phase">Execution</option>
                  <option value="Monitoring and Controlling">Monitoring</option>
                </select>
                <Filter className="absolute right-3 top-2.5 text-gray-400 h-5 w-5 pointer-events-none" />
              </motion.div>

              {/* Stats Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStats(!showStats)}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-700 transition-all"
              >
                <BarChart2 className="h-5 w-5" />
                Statistics
              </motion.button>
            </div>

            {/* Statistics Panel */}
            <AnimatePresence>
              {showStats && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg p-4 overflow-hidden"
                >
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                      <motion.div 
                        className="text-3xl font-bold text-blue-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        {stats.total}
                      </motion.div>
                      <div className="text-gray-400">Total Projects</div>
                    </div>
                    {Object.entries(stats.byPhase).map(([phase, count], idx) => (
                      <motion.div 
                        key={phase}
                        className="text-center p-4 bg-gray-700/50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="text-2xl font-bold text-blue-400">{count}</div>
                        <div className="text-gray-400">{phase.replace(' Phase', '')}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <AnimatePresence>
            {filteredEcosystem.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.1 }}
              >
                <PillarSection section={section} />
              </motion.div>
            ))}
            {filteredEcosystem.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 py-8"
              >
                No projects found matching your criteria
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const ecosystem: EcosystemSection[] = [
  {
    pillar: {
      title: "Citizen Interaction",
      description: "Online Citizen Portal Interaction",
      icon: Users,
      gradient: "bg-gradient-to-r from-emerald-600 to-teal-600"
    },
    initiatives: [
      {
        name: "Digital Service Catalogue",
        icon: FileText,
        projects: [
          {
            name: "Online Citizen Portal",
            description: "Digital Service Catalogue",
            phase: "Planning Phase",
            status: "Engaging Various Directorates to scope services"
          },
          {
            name: "Website",
            description: "Online Citizen Portal Interaction",
            phase: "Initiation Phase",
            status: "Committee was appointed, further engagements to occur"
          },
          {
            name: "Citizen Engagement Portal",
            description: "URS Development and Prototyping",
            phase: "Planning Phase",
            status: "URS Developed and pending approval and prototype (concept) developed"
          }
        ]
      },
      {
        name: "Mobile Applications",
        icon: Smartphone,
        projects: [
          {
            name: "KZN Department of Transport App",
            description: "Mobile Application Development",
            phase: "Planning Phase",
            status: "URS Developed and pending approval and prototype (concept) developed"
          }
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Smart Road Safety",
      description: "Digital Road Alert & Infrastructure",
      icon: AlertTriangle,
      gradient: "bg-gradient-to-r from-amber-600 to-orange-600"
    },
    initiatives: [
      {
        name: "Digital Road Alert",
        icon: Car,
        projects: [
          {
            name: "Digital Road Alert System",
            description: "Intelligent road safety alerts",
            phase: "Initiation Phase",
            status: "Conducting Research"
          }
        ]
      },
      {
        name: "Infrastructure Interface",
        icon: Navigation,
        projects: [
          {
            name: "Vehicle Infrastructure Interface",
            description: "Interface between driver, vehicle and infrastructure",
            phase: "Initiation Phase",
            status: "Conducting Research"
          }
        ]
      },
      {
        name: "Advanced Technologies",
        icon: Activity,
        projects: [
          {
            name: "Augmented Reality",
            description: "AR implementation for road safety",
            phase: "Initiation Phase",
            status: "Conducting Research"
          },
          {
            name: "Data Analytics",
            description: "Predictive Data Analytics",
            phase: "Initiation Phase",
            status: "Conducting Research"
          }
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Smart Public Transport",
      description: "Smart Driver and Digital Enabled Passengers",
      icon: Bus,
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-600"
    },
    initiatives: [
      {
        name: "Smart Driver Solutions",
        icon: UserCog,
        projects: [
          {
            name: "Driver Information Platform",
            description: "Smart driver information system",
            phase: "Initiation Phase",
            status: "Pending stakeholder engagement (Santaco)"
          },
          {
            name: "Smart Payment System",
            description: "Digital payment platform",
            phase: "Planning Phase",
            status: "URS Developed, reviewed pending approval from custodian"
          },
          {
            name: "Digital Operating License",
            description: "Operating license management",
            phase: "Execution Phase",
            status: "Tender has been awarded to supplier"
          }
        ]
      },
      {
        name: "Passenger Systems",
        icon: TicketIcon,
        projects: [
          {
            name: "Driver Passenger Online System",
            description: "Passenger information platform",
            phase: "Initiation Phase",
            status: "URS Developed and pending signoff from relevant stakeholders"
          },
          {
            name: "Electronic Bus Monitoring",
            description: "Real-time bus tracking",
            phase: "Execution Phase",
            status: "Tender has been awarded to supplier"
          }
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Digital Traffic Management",
      description: "Real-time Track and Trace Operations",
      icon: TrafficCone,
      gradient: "bg-gradient-to-r from-green-600 to-emerald-600"
    },
    initiatives: [
      {
        name: "Real-time Monitoring",
        icon: Activity,
        projects: [
          {
            name: "Incident Management",
            description: "Incident and Accident Management",
            phase: "Execution Phase",
            status: "Was presented to RTI currently pending changes from Vodacom"
          },
          {
            name: "Fleet Management",
            description: "Vehicle tracking and management",
            phase: "Execution Phase",
            status: "In Operation"
          },
          {
            name: "Traffic Management System",
            description: "Integrated traffic control",
            phase: "Initiation Phase",
            status: "URS under development by Business Analysts"
          }
        ]
      },
      {
        name: "Operations Support",
        icon: Smartphone,
        projects: [
          {
            name: "Personal Operating Devices",
            description: "Mobile apps for operations",
            phase: "Monitoring and Controlling",
            status: "In operation"
          },
          {
            name: "Opus Data Analytics",
            description: "Operational analytics",
            phase: "Initiation Phase",
            status: "Data gathered and presented to Mr Chetty, awaiting feedback"
          }
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Smart Infrastructure",
      description: "Infrastructure Assessment and Robotics",
      icon: Construction,
      gradient: "bg-gradient-to-r from-red-600 to-pink-600"
    },
    initiatives: [
      {
        name: "Infrastructure Assessment",
        icon: Tool,
        projects: [
          {
            name: "Smart Road Assessment",
            description: "Infrastructure virtual assessment",
            phase: "Initiation Phase",
            status: "Conducting Research"
          },
          {
            name: "Robotics Infrastructure",
            description: "Automated infrastructure inspection",
            phase: "Initiation Phase",
            status: "Conducting Research"
          }
        ]
      },
      {
        name: "Planning Systems",
        icon: Map,
        projects: [
          {
            name: "Master Planning",
            description: "Transportation and Infrastructure Master Plans",
            phase: "Execution Phase",
            status: "In Progress"
          },
          {
            name: "Predictive Analytics",
            description: "Infrastructure data analysis",
            phase: "Initiation Phase",
            status: "Conducting Research"
          }
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Modern Workplace",
      description: "Process Automation and Employee Services",
      icon: Cloud,
      gradient: "bg-gradient-to-r from-sky-600 to-blue-600"
    },
    initiatives: [
      {
        name: "Process Automation",
        icon: ClipboardCheck,
        projects: [
          {
            name: "Digital Forms",
            description: "PowerApps & OneDrive Integration",
            phase: "Execution Phase",
            status: "Ongoing collection and digitizing of manual forms and processes"
          },
          {
            name: "Electronic Signatures",
            description: "Digital signature system",
            phase: "Monitoring and Controlling",
            status: "In Operation"
          },
          {
            name: "M&E System",
            description: "Monitoring and Evaluation System",
            phase: "Initiation Phase",
            status: "On hold, awaiting decision on whether to go open tender or through Microsoft"
          }
        ]
      },
      {
        name: "SCM Automation",
        icon: FileText,
        projects: [
          {
            name: "SCM Model Driven App",
            description: "Supply chain management automation",
            phase: "Execution Phase",
            status: "Testing Stage"
          },
          {
            name: "Invoice Tracking System",
            description: "Automated invoice processing",
            phase: "Execution Phase",
            status: "Developed by Vodacom but not utilised"
          }
        ]
      },
      {
        name: "Employee Self-Service",
        icon: UserCog,
        projects: [
          {
            name: "E-leave System",
            description: "Electronic leave management",
            phase: "Execution Phase",
            status: "Developed by Vodacom but not utilised"
          },
          {
            name: "S&T Project",
            description: "Subsistence and Travel Management",
            phase: "Execution Phase",
            status: "Developed by Vodacom but not utilised"
          }
        ]
      }
    ]
  }

];

