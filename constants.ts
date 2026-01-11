import { Portfolio, RiskScenario, MarketIndex, ComplianceRule, YieldCurvePoint } from './types';

export const MOCK_INDICES: MarketIndex[] = [
  { name: 'S&P 500', value: 5234.12, change: 0.45 },
  { name: 'NASDAQ', value: 16890.30, change: 0.82 },
  { name: 'MSCI World', value: 3450.10, change: 0.12 },
  { name: 'US 10Y Yield', value: 4.25, change: -1.5 },
];

export const MOCK_PORTFOLIO: Portfolio = {
  id: 'PF-2024-GLOBAL-EQ',
  name: 'Global Equity Alpha Fund',
  manager: 'Aladdin Wealth Team',
  totalAum: 4520000000,
  currency: 'USD',
  dailyReturn: 0.65,
  ytdReturn: 12.4,
  riskLevel: 'Moderate',
  sharpeRatio: 1.8,
  assets: [
    { id: '1', ticker: 'MSFT', name: 'Microsoft Corp', assetClass: 'Equity', allocation: 8.5, marketValue: 384200000, dailyChange: 1.2, volatility: 18, esgScore: 92, sector: 'Technology' },
    { id: '2', ticker: 'NVDA', name: 'NVIDIA Corp', assetClass: 'Equity', allocation: 6.2, marketValue: 280240000, dailyChange: 2.4, volatility: 35, esgScore: 85, sector: 'Technology' },
    { id: '3', ticker: 'JPM', name: 'JPMorgan Chase', assetClass: 'Equity', allocation: 4.1, marketValue: 185320000, dailyChange: -0.5, volatility: 22, esgScore: 78, sector: 'Financials' },
    { id: '4', ticker: 'US-T-10', name: 'US Treasury 10Y', assetClass: 'Fixed Income', allocation: 15.0, marketValue: 678000000, dailyChange: 0.1, volatility: 5, esgScore: 0, sector: 'Government' },
    { id: '5', ticker: 'VIX-FUT', name: 'Volatility Index Future', assetClass: 'Derivative', allocation: 2.0, marketValue: 90400000, dailyChange: -3.2, volatility: 65, esgScore: 0, sector: 'Derivatives' },
    { id: '6', ticker: 'AAPL', name: 'Apple Inc.', assetClass: 'Equity', allocation: 7.8, marketValue: 352560000, dailyChange: 0.8, volatility: 19, esgScore: 88, sector: 'Technology' },
    { id: '7', ticker: 'AMZN', name: 'Amazon.com', assetClass: 'Equity', allocation: 5.5, marketValue: 248600000, dailyChange: 1.1, volatility: 25, esgScore: 82, sector: 'Consumer Discretionary' },
    { id: '8', ticker: 'CASH', name: 'USD Liquidity', assetClass: 'Cash', allocation: 50.9, marketValue: 2300680000, dailyChange: 0.0, volatility: 0, esgScore: 0, sector: 'Cash' },
  ]
};

export const CHART_DATA_ALLOCATION = [
  { name: 'Equity', value: 65 },
  { name: 'Fixed Income', value: 25 },
  { name: 'Derivatives', value: 5 },
  { name: 'Cash', value: 5 },
];

export const CHART_DATA_PERFORMANCE = [
  { month: 'Jan', portfolio: 2.1, benchmark: 1.8 },
  { month: 'Feb', portfolio: 4.5, benchmark: 3.2 },
  { month: 'Mar', portfolio: 3.2, benchmark: 2.9 },
  { month: 'Apr', portfolio: 5.8, benchmark: 4.5 },
  { month: 'May', portfolio: 4.9, benchmark: 4.1 },
  { month: 'Jun', portfolio: 7.2, benchmark: 5.8 },
];

export const RISK_SCENARIOS: RiskScenario[] = [
  { id: 'sc-1', name: 'Inflation Shock (CPI +2%)', description: 'Simulated impact of a sudden 200bps rise in core inflation.', impactEstimate: -4.5, probability: 'Medium' },
  { id: 'sc-2', name: 'Global Recession', description: 'Contraction of global GDP by 1.5% over two quarters.', impactEstimate: -12.2, probability: 'Low' },
  { id: 'sc-3', name: 'Tech Sector Correction', description: '20% valuation correction in mega-cap technology stocks.', impactEstimate: -8.7, probability: 'High' },
  { id: 'sc-4', name: 'Oil Price Spike', description: 'Crude oil prices exceeding $120/barrel.', impactEstimate: -2.1, probability: 'Medium' },
];

export const COMPLIANCE_RULES: ComplianceRule[] = [
  { id: 'rule-1', ruleName: 'Maximum Single Issuer Exposure', status: 'Passed', limit: '< 10%', currentValue: '8.5% (MSFT)', severity: 'High' },
  { id: 'rule-2', ruleName: 'Minimum Cash Liquidity', status: 'Warning', limit: '> 5%', currentValue: '5.1%', severity: 'High' },
  { id: 'rule-3', ruleName: 'ESG Portfolio Score', status: 'Passed', limit: '> 70', currentValue: '82', severity: 'Medium' },
  { id: 'rule-4', ruleName: 'Restricted Stock List', status: 'Failed', limit: '0 Holdings', currentValue: '1 Holding (Legacy)', severity: 'Low' },
];

export const YIELD_CURVE_DATA: YieldCurvePoint[] = [
  { tenor: '1M', yield: 5.35, lastYear: 4.10 },
  { tenor: '3M', yield: 5.40, lastYear: 4.25 },
  { tenor: '6M', yield: 5.30, lastYear: 4.40 },
  { tenor: '1Y', yield: 5.10, lastYear: 4.50 },
  { tenor: '2Y', yield: 4.85, lastYear: 4.20 },
  { tenor: '5Y', yield: 4.50, lastYear: 3.90 },
  { tenor: '10Y', yield: 4.45, lastYear: 3.80 },
  { tenor: '30Y', yield: 4.60, lastYear: 3.95 },
];