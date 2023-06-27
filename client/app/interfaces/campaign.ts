export interface ICampaignSummary {
  minimumContribution: number;
  balance: BigInt;
  requestsCount: number;
  approversCount: number;
  manager: string;
}

export interface ICampaignRequest {
  description: string;
  value: number;
  recipient: string;
  complete: boolean;
  approvalCount: number;
}
