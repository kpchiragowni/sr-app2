export interface IOpportunities {
    opportunities: IOpportunity[];
}

export interface IOpportunity {
    company: string;
    tradingActive: boolean;
    averageInvestment: number;
    totalRaised: number;
    eis: boolean;
    seis: boolean;
}
