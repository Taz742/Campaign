'use client';

import { Button, Grid } from '@mui/material';
import CampaignItem from './CampaignItem';
import Layout from '../../layout';
import Link from 'next/link';

interface IProps {
  campaigns: string[];
}

export default function CampaignsList({ campaigns }: IProps) {
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {campaigns.map((campaign) => {
              return (
                <Grid item key={campaign} xs={6}>
                  <CampaignItem address={campaign} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Link href='/campaigns/new' as='/campaigns/new'>
            <Button variant='contained' fullWidth>
              Create campaign
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Layout>
  );
}
