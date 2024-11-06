
export interface Project {
  name: string;
  description: string;
  phase: 'Planning Phase' | 'Initiation Phase' | 'Execution Phase' | 'Monitoring and Controlling';
  status: string;
}

export interface Initiative {
  name: string;
  icon: React.ElementType;
  projects: Project[];
}

export interface Pillar {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

export interface EcosystemSection {
  pillar: Pillar;
  initiatives: Initiative[];
}