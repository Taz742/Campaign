'use client';

import * as React from 'react';
import { ICampaignSummary } from '@/app/interfaces/campaign';
import web3 from '@/app/ethereum/web3';
import { Grid } from '@mui/material';
import CampaignSummaryItem from './CampaignSummaryItem';

function createSummaryItem(
  header: string | number,
  label: string,
  description: string
) {
  return {
    header,
    label,
    description,
  };
}

interface IProps {
  summary: ICampaignSummary;
}

export default function CampaignSummaryList({ summary }: IProps) {
  const items = [
    createSummaryItem(
      summary.manager,
      'Address of Manager',
      'The manager created this campaign and can create requests to withdraw money'
    ),
    createSummaryItem(
      summary.minimumContribution,
      'Minimum Contribution (WEI)',
      'You must contribute at least this much WEI to be a approver'
    ),
    createSummaryItem(
      summary.requestsCount,
      'Number of Requests',
      'A request tries to withdraw money from the contract. Requests can be approved by approvers'
    ),
    createSummaryItem(
      summary.approversCount,
      'Number of Approvals',
      'Number of people who already donatest to this campaign'
    ),
    createSummaryItem(
      web3.utils.fromWei(String(summary.balance), 'ether'),
      'Campaign balance (ETH)',
      'The balance is how much money this campaign has left to spend'
    ),
  ];

  return (
    <Grid container spacing={2} direction='row' alignItems='stretch'>
      {items.map((item) => {
        return (
          <Grid item key={item.label} xs={6}>
            <CampaignSummaryItem
              header={item.header}
              label={item.label}
              description={item.description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
