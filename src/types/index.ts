// src/types/index.ts
export interface InvestmentPlan {
    name: string;
    investmentAmount: string;
    duration: string;
    security: string;
    totalReturns: string;
    benefits: string[];
  }
  
  export interface ProjectDetail {
    id: string;
    title: string;
    location: string;
    description: string;
    amenitiesCount: number;
  }