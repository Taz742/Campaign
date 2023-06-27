'use client';

import * as React from 'react';
import { Grid, Button } from '@mui/material';
import Link from 'next/link';
import { ICampaignSummary } from '@/app/interfaces/campaign';
import CampaignSummaryList from './CampaignSummaryList';
import ContributeForm from '../ContributeForm/ContributeForm';

interface IProps {
  address: string;
  summary: ICampaignSummary;
}

export default function CampaignView({ address, summary }: IProps) {
  return (
    <Grid container spacing={8}>
      <Grid item xs={8}>
        <CampaignSummaryList summary={summary} />
        <Link href={`/campaigns/${address}/requests`}>
          <Button variant='contained' sx={{ mt: 2 }}>
            View Requests
          </Button>
        </Link>
      </Grid>
      <Grid item xs={4}>
        <ContributeForm address={address} />
      </Grid>
    </Grid>
  );
}
