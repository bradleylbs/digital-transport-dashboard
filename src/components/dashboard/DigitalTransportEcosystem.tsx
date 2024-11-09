"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { PillarSection } from './PillarSection';
import type { EcosystemSection } from './types';
import { 
  Search, 
  Filter, 
  BarChart2, 
  Users, 
  Workflow, 
  Bus, 
  TrafficCone,
  HardHat as Construction,
  Cloud,
  Smartphone, 
  FileText,
  AlertTriangle, 
  Globe,
  Ticket as TicketIcon,
  Activity, 
  Map, 
  Wrench as Tool,
  ScanLine, 
  Glasses, 
  LineChart, 
  UserCog,
  Bell,Link,Eye, BarChart, CreditCard, Camera, WormIcon, Cpu,
  Link2,
  HeadphonesIcon,
  ShieldAlert,
  CarFront,
  MonitorSmartphone,
  BadgeCheck,
  Navigation2,
  ActivitySquare,
  AlertCircle,
  Building2,
  Users2,
  Brain,
  Settings2,
  ScanSearch,
  FileStack,
  Wallet
} from 'lucide-react';

export function DigitalTransportEcosystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<string>('');
  const [showStats, setShowStats] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  // Function to handle pillar selection
  const handlePillarSelect = (pillarTitle: string) => {
    setSelectedPillar(selectedPillar === pillarTitle ? null : pillarTitle);
  };

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
            6 PILLARS TO PROVIDE AN INTEGRATED DIGITISED MOBILITY ECOSYSTEM
            </CardTitle>
            <p className="text-center text-gray-400 mt-2">
            Kwazulu-Natal Department of Transport
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
                <div
                  className={`cursor-pointer p-4 rounded-lg ${
                    selectedPillar === section.pillar.title
                      ? 'bg-blue-800'
                      : 'bg-gray-700'
                  }`}
                  onClick={() => handlePillarSelect(section.pillar.title)}
                >
                  <PillarSection section={section} />
                </div>
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
      description: "Citizen Interaction pillar enhances public engagement by providing easy access to transport services through online platforms, real-time updates, and feedback channels, ensuring that all communities can efficiently connect with KZN Department of Transport.",
      icon: Users,
      gradient: "bg-gradient-to-r from-emerald-600 to-teal-600"
    },
    initiatives: [
      {
        name: "Citizen Portal Solution",
        icon: Globe,
        projects: [
          {
            name: "Digital Service Catalogue",
            description: "The Digital Service Catalogue for the KwaZulu-Natal Department of Transport (KZN DOT) is a comprehensive online platform designed to provide easy access to a wide range of transport-related services. This initiative aims to enhance transparency, efficiency, and user experience by offering detailed information about services available to the public and stakeholders.",
            phase: "Planning Phase",
            status: "Engaging Various Directorates to scope services"
          },
          {
            name: "Website",
            description: "Online platform for accessing information about transport services in KwaZulu-Natal. It provides resources on road maintenance, public transport, licensing, and traffic management, along with online application options and essential contact information for residents.",
            phase: "Initiation Phase",
            status: "Committee was appointed, further engagements to occur"
          },
          {
            name: "Citizen Engagement Portal",
            description: "is an interactive online platform designed to facilitate communication and collaboration between the KwaZulu-Natal Department of Transport and the public. It allows citizens to access information, submit inquiries, provide feedback, and participate in consultations, enhancing transparency and community involvement in transport-related initiatives.",
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
            description: " is a mobile application that provides residents with easy access to transport-related services and information. It features real-time updates on road conditions, public transport options, licensing services, and traffic management, enabling users to engage with the department and stay informed about important transport issues in KwaZulu-Natal.",
            phase: "Planning Phase",
            status: "URS Developed and pending approval and prototype (concept) developed"
          }
        ]
      },
      {
        name: "Online Interactions with DOT Services via Web Services",
        icon: Link2,
        projects: [
          {
            name: "Payment Gateway",
            description: " is a secure online system that facilitates electronic transactions for services offered by the KwaZulu-Natal Department of Transport. It enables users to make payments for licensing, registrations, and other transport-related services conveniently and safely, ensuring a seamless and efficient payment experience.",
            phase: "Planning Phase",
            status: "URS developed; under review and signature."
          },
          {
            name: "License Management System",
            description: "is an online platform designed to streamline the application, renewal, and management of licenses for various transport services. It enables users to submit applications, track their status, and access important information, ensuring efficient and transparent handling of licensing processes by the KwaZulu-Natal Department of Transport.",
            phase: "Planning Phase",
            status: "The project kick-off has been held, and it is now in the planning stage."
          },
          {
            name: "Queueing Management System",
            description: "  is designed to optimize the flow of customers for transport services by providing real-time monitoring, appointment scheduling, and status updates. This initiative reduces wait times and enhances service efficiency, ensuring a more organized experience for users at KwaZulu-Natal Department of Transport facilities.",
            phase: "Planning Phase",
            status: "Bid Adjudication Committee (BAC)"
          }
        ]
      },
      {
        name: "Cloud-based CRM",
        icon: HeadphonesIcon,
        projects: [
          {
            name: "Contact Centre",
            description: "serves as the primary communication hub for the KwaZulu-Natal Department of Transport, providing support and assistance to the public. It handles inquiries related to transport services, licensing, and regulations, ensuring prompt and effective responses. The centre aims to enhance customer satisfaction by offering a dedicated platform for users to access information, report issues, and receive guidance on transport-related matters.",
            phase: "Execution Phase",
            status: "Pilot stage pending executive approval"
          },
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Smart Road Safety",
      description: "The Smart Road Safety pillar leverages technology to improve road safety and traffic management. Initiatives such as the Digital Road Alert System and Vehicle Infrastructure Interface aim to reduce accidents and enhance public safety on KwaZulu-Natal’s roads.",
      icon: ShieldAlert,
      gradient: "bg-gradient-to-r from-amber-600 to-orange-600"
    },
    initiatives: [
      {
        name: "Digital Road Alert",
        icon: Bell,
        projects: [
          {
            name: "Digital Road Alert System",
            description: " is an innovative platform designed to provide real-time information and alerts regarding road conditions, closures, and safety updates. This system enhances public safety by informing drivers of potential hazards and traffic disruptions, enabling them to make informed decisions while on the road. By leveraging technology, the Digital Road Alert System aims to improve traffic management and reduce accidents, contributing to safer travel in KwaZulu-Natal.",
            phase: "Planning Phase",
            status: "URS Developed, Pending CIO Approval"
          }
        ]
      },
      {
        name: "Interface Between Driver, Vehicle and Infrastructure ",
        icon: CarFront,
        projects: [
          {
            name: "Vehicle Infrastructure Interface",
            description: " is a communication system that connects vehicles to roadway infrastructure, enabling the exchange of critical information for enhanced traffic management and safety. This interface facilitates real-time data sharing between vehicles and infrastructure elements, such as traffic signals and road signs, to optimize traffic flow, reduce congestion, and improve overall road safety. It supports initiatives like smart transportation systems and advanced driver-assistance technologies, contributing to more efficient and safer travel experiences.",
            phase: "Planning Phase",
            status: "URS Developed, Pending CIO Approval"
          }
        ]
      },
      {
        name: "Augmented Reality",
        icon: Eye,
        projects: [
          {
            name: "Assess The Mobility Demand and Accurance of Incident and Events",
            description: "involves analyzing transportation patterns and evaluating the frequency and impact of incidents on mobility. This process helps identify peak travel times, assess infrastructure needs, and understand how incidents (such as accidents or road closures) affect traffic flow and public transportation. By gathering and analyzing data on mobility demand and incident occurrences, transportation agencies can improve planning, enhance response strategies, and optimize resource allocation for more efficient and safer transportation systems.",
            phase: "Initiation Phase",
            status: "Not Yet Initiated"
          },
          {
            name: "Road Saftey AR Application",
            description: " is an interactive mobile tool designed to enhance road safety awareness and education. Using AR technology, the app overlays digital information onto the real-world environment, providing users with immersive experiences such as virtual simulations of traffic scenarios, hazard identification, and safe driving practices. This application aims to engage users in learning about road safety in an innovative way, helping to reduce accidents and promote responsible behavior among drivers and pedestrians. By making safety education more engaging and accessible, the AR application supports the overall goal of improving road safety in communities.",
            phase: "Initiation Phase",
            status: "Not Yet Initiated"
          }
        ]
      },
      {
        name: "Digital Traffic Congestion Monotoring / Routing ",
        icon: Map,
        projects: [
          {
            name: " Arguemented Reality for road safety",
            description: "an advanced technological solution designed to analyze and manage traffic flow in real time. This system utilizes data from various sources, including sensors, cameras, and GPS devices, to monitor congestion levels on roadways. By providing real-time traffic updates and alternative routing options, it helps drivers avoid congested areas, reducing travel times and enhancing overall road safety. The system aims to optimize traffic management by enabling authorities to respond quickly to congestion issues, improving the efficiency of the transportation network and promoting smoother traffic flow.",
           phase: "Initiation Phase",
            status: "Not Yet Initiated"
          },
          
        ]
      }

    ]
  },
  {
    pillar: {
      title: "Smart Public Transport",
      description: "Smart Public Transport pillar modernizes public transportation systems through initiatives like the Driver Information Platform and Electronic Bus Monitoring, making services more efficient and user-friendly for both drivers and passengers.",
      icon: Bus,
      gradient: "bg-gradient-to-r from-purple-600 to-indigo-600"
    },
    initiatives: [
      {
        name: "Smart Enabled Driver",
        icon: MonitorSmartphone,
        projects: [
          {
            name: "Driver Information Platform",
            description: "Driver Information Platform is a digital solution that provides drivers with access to essential information, resources, and support services. This platform aims to enhance driver compliance and awareness, ultimately improving efficiency of transport operations in KwaZulu-Natal",
            phase: "Initiation Phase",
            status: "Pending stakeholder engagement (Santaco)"
          },
          {
            name: "Smart Payment System",
            description: "Smart Payment System is a digital platform that enables secure and efficient transactions for public transport services. It allows passengers to pay for fares using various methods, including mobile wallets and online payments, streamlining the payment process and enhancing the overall convenience of using public transportation in KwaZulu-Natal.",
            phase: "Planning Phase",
            status: "URS Developed, reviewed pending approval from custodian"
          },
        ]
      },
      {
        name: "Digital-enabled Passengers",
        icon: BadgeCheck,
        projects: [
          {
            name: "Driver Passenger Online System ",
            description: "digital platform designed to facilitate communication and information sharing between drivers and passengers in the public transport sector. It provides real-time updates on routes, schedules, and availability, enhancing the user experience by allowing passengers to access critical information and connect with drivers more efficiently. This system aims to improve service reliability and foster greater engagement within the public transportation network in KwaZulu-Natal.",
            phase: "Initiation Phase",
            status: "URS Developed and pending signoff from relevant stakeholders"
          },
        ]
      },{
        name: "Passenger Online Information",
        icon: Navigation2,
        projects: [
          {
            name: "Electronic Bus Monitoring",
            description: "is a digital solution that provides real-time tracking and management of public buses. This system allows operators to monitor bus locations, schedules, and performance metrics, enhancing operational efficiency and ensuring timely services. By offering passengers access to live updates on bus arrivals and delays, the Electronic Bus Monitoring system improves the overall reliability and user experience of public transportation in KwaZulu-Natal.",
            phase: "Execution Phase",
            status: "Tender has been awarded to supplier"
          }
        ]
      },
      {
        name: "Operating Licences",
        icon: BadgeCheck,
        projects: [
          {
            name: "Digital Operating License",
            description: " is an online system designed for public transport operators to efficiently manage the application and renewal of their operating licenses. This digital platform simplifies the licensing process by allowing operators to submit applications and track their status online, ensuring compliance with regulations. By streamlining these operations, the Digital Operating License enhances the efficiency and accessibility of public transport services in KwaZulu-Natal.",
            phase: "Execution Phase",
            status: "Tender has been awarded to supplier"
          }
        ]
      },
    ]
  },
  {
    pillar: {
    title: "Digital Traffic Management",
    description: " Digital Traffic Management pillar focuses on improving traffic operations through real-time monitoring and incident management. Initiatives like Incident & Accident Management enhance safety and efficiency in managing KwaZulu-Natal's transport network.",
    icon: TrafficCone,  
    gradient: "bg-gradient-to-r from-green-600 to-emerald-600"
      },
    initiatives: [
      {
        name: "Real Time Track and Trace",
        icon: ActivitySquare,
        projects: [
          {
            name: "Incident & Accident Management",
            description: " is a system focused on efficiently monitoring, reporting, and managing road incidents and accidents. It enables rapid response coordination among emergency services and authorities, ensuring swift resolution and minimizing disruptions to traffic flow. This system aims to enhance road safety and improve incident response across the province, contributing to a safer transportation environment for all road users.",
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
            description: "is a comprehensive system that oversees the tracking, maintenance, and optimization of the department's vehicle fleet. It enhances operational efficiency by monitoring vehicle performance, managing logistics, and ensuring compliance with regulations. The system aims to reduce costs, improve service delivery, and ensure the safe and effective use of transport resources across the province.",
            phase: "Initiation Phase",
            status: "URS under development by Business Analysts"
          }
        ]
      },
      {
        name: "Mobile Apps for Ops and Service Personnel",
        icon: MonitorSmartphone,
        projects: [
          {
            name: "Personal Operating Devices",
            description: "are handheld devices utilized by the Road Traffic Inspectorate (RTI) and Provincial Traffic Enforcement Services (PTES) within the KwaZulu-Natal Department of Transport. These devices enable officers to perform their duties efficiently by providing access to real-time data, facilitating communication, and streamlining various operational functions. With features tailored for traffic enforcement and monitoring, Personal Operating Devices enhance the effectiveness and responsiveness of law enforcement on the roads.",
            phase: "Monitoring and Controlling",
            status: "In operation"
          }
        ]
      },

      {
        name: "Operational Data Analytics",
        icon: LineChart,
        projects: [
        
          {
            name: "Opus Data Analytics",
            description: "Operational analytics",
            phase: "Initiation Phase",
            status: "Data gathered and presented to Mr Chetty, awaiting feedback"
          }
        ]
      },{
        name: "Exception Handling",
        icon: AlertCircle,
        projects: [
          {
            name: "Traffic Management Exception Handling System (TMEHS) .",
            description: "is a data-driven platform designed to identify, classify, and resolve traffic incidents in real-time. By integrating machine learning, automated workflows, and real-time data from traffic cameras, sensors, and GPS, TMEHS enables efficient and adaptive management of road disruptions, such as accidents, congestion, and equipment failures. The system’s context-aware adjustments and feedback loops optimize response times, enhance road safety, and minimize disruptions, setting a new standard in modern traffic management",
            phase: "Initiation Phase",
            status: "Not Yet Initiated"
          }
        ]
      },
     
    ]
  },
  {
    pillar: {
      title: "Smart Road Infrastructure",
      description: "Smart Road Infrastructure pillar emphasizes innovative assessments and upgrades to transport infrastructure. Projects such as Smart Road Assessment and Robotics Infrastructure ensure the quality and resilience of the transport system in KwaZulu-Natal.",
      icon: Building2,
      gradient: "bg-gradient-to-r from-red-600 to-pink-600"
    },
    initiatives: [
      {
        name: "Infrastructure Virtual Assessment",
        icon: ScanLine,
        projects: [
          {
            name: "Smart Road Assessment",
            description: "initiative utilizes advanced technologies and data analytics to evaluate the condition and performance of road infrastructure. By employing automated inspection methods and real-time monitoring, this project aims to enhance the efficiency of road assessments, ensuring timely maintenance and improvements. This proactive approach contributes to safer and more reliable transportation systems in KwaZulu-Natal.",
            phase: "Initiation Phase",
            status: "Conducting Research"
          },
          
        ]
      },
      {
        name: "Collaborative Planning",
        icon: Users2,
        projects: [
          {
            name: "Transportation and Infrastructure Master Plans ",
            description: "initiative focuses on developing comprehensive strategies for the planning, development, and maintenance of transport infrastructure in KwaZulu-Natal. This project aims to assess current needs, forecast future demands, and ensure sustainable growth by integrating various transportation modes. The Master Plans will guide investment decisions, optimize resource allocation, and enhance overall connectivity within the province, ultimately improving the efficiency and effectiveness of the transportation network.",
            phase: "Execution Phase",
            status: "In Progress"
          },
         
        ]
      },
      {
        name: "Augmented Reality",
        icon: Glasses,
        projects: [
          {
            name: "Augmented Reality",
            description: " Augmented Reality focuses on leveraging AR technology to improve the assessment and maintenance of road infrastructure. This project enables real-time visualization of road conditions and potential hazards, allowing engineers and maintenance crews to identify issues more efficiently. By providing immersive experiences that simulate traffic scenarios and infrastructure assessments, this initiative enhances decision-making processes and promotes proactive maintenance strategies, ultimately contributing to safer and more reliable transportation systems in KwaZulu-Natal.",
            phase: "Initiation Phase",
            status: "In Progress"
          },
         
        ]
      },{
        name: "Predicative Analytics",
        icon: Brain,
        projects: [
          {
            name: "Predicative Analytics",
            description: "Predicative Analytics is a data-driven techniques to forecast future infrastructure needs and performance. By analyzing historical data on road usage, maintenance records, and traffic patterns, this project aims to identify potential issues before they arise and optimize resource allocation for maintenance and upgrades. This proactive approach enhances the longevity and reliability of road infrastructure, ensuring that it meets the evolving demands of KwaZulu-Natal's transportation network while improving overall safety and efficiency.",
            phase: "Execution Phase",
            status: "In Progress"
          },
         
        ]
      },
      {
        name: "Robotics Infrastructure",
        icon: Cpu ,
        projects: [
          {
            name: "Robotics Infrastructure",
            description: "Robotics Infrastructure employing robotic technologies for the automated inspection and maintenance of transportation assets. This project aims to enhance the efficiency and accuracy of infrastructure assessments by utilizing drones and autonomous vehicles to conduct routine inspections, monitor road conditions, and identify maintenance needs in real time. By integrating robotics into infrastructure management, this initiative improves safety, reduces manual labor, and ensures timely upkeep of roadways, ultimately contributing to a more resilient and reliable transportation system in KwaZulu-Natal.",
            phase: "Initiation Phase",
            status: "In Progress"
          },
         
        ]
      }
    ]
  },
  {
    pillar: {
      title: "Modern Workplace",
      description: " Modern Workplace pillar enhances internal processes and employee services through digital tools like Paperless Process Automation and Employee Self-Service systems, improving operational efficiency and service delivery within KZN DoT.",
      icon: Cloud,
      gradient: "bg-gradient-to-r from-sky-600 to-blue-600"
    },
    initiatives: [
      {
        name: "Paperless Process Automation",
        icon: Workflow,
        projects: [
          {
            name: "Electronic Signatures",
            description: "Digital signature system",
            phase: "Monitoring and Controlling",
            status: "In Operation"
          },
          {
            name: "Monitoring and Evaluation System",
            description: "Monitoring and Evaluation System",
            phase: "Initiation Phase",
            status: "On hold, awaiting decision on whether to go open tender or through Microsoft"
          }
        ]
      },
      {
        name: "SCM Automation",
        icon: Settings2,
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
            name: "Subsistence and Travel (S&T) Project",
            description: "Subsistence and Travel Management",
            phase: "Execution Phase",
            status: "Developed by Vodacom but not utilised"
          }
        ]
      },
      {
        name: "Optical Character Recognition",
        icon:ScanSearch,
        projects: [
          {
            name: "Optical Character Recognition_Doc Conversion Recog.:Procure to Pay",
            description: "OCR for document conversion",
            phase: "Execution Phase",
            status: "Ongoing collection and digitizing of manual forms and processes"
          }
        ]
      },
      {
        name: "Digital Forms",
        icon: FileStack,
        projects: [
          {
            name: "PowerApps & OneDrive Integration",
            description: "Integration of PowerApps and OneDrive",
            phase: "Execution Phase",
            status: "Ongoing collection and digitizing of manual forms and processes"
          }
        ]
      },
      {
        name: "Online Citizen Payments",
        icon: Wallet,
        projects: [
          {
            name: "Payment Gateway",
            description: "Implementation of online payment gateway",
            phase: "Execution Phase",
            status: "Ongoing collection and digitizing of manual forms and processes"
          }
        ]
      }
    ]
  }

];

