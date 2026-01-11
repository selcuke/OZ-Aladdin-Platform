export interface Asset {
  id: string;
  ticker: string;
  name: string;
  assetClass: 'Equity' | 'Fixed Income' | 'Derivative' | 'Cash';
  allocation: number; // Percentage
  marketValue: number;
  dailyChange: number; // Percentage
  volatility: number;
  esgScore: number; // 0-100
  sector: string;
}

export interface Portfolio {
  id: string;
  name: string;
  manager: string;
  totalAum: number;
  currency: string;
  assets: Asset[];
  dailyReturn: number;
  ytdReturn: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  sharpeRatio: number;
}

export interface RiskScenario {
  id: string;
  name: string;
  description: string;
  impactEstimate: number; // Estimated % drop in portfolio value
  probability: 'Low' | 'Medium' | 'High';
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
}

export interface ComplianceRule {
  id: string;
  ruleName: string;
  status: 'Passed' | 'Failed' | 'Warning';
  limit: string;
  currentValue: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface YieldCurvePoint {
  tenor: string;
  yield: number;
  lastYear: number;
}