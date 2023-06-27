'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface IProps {
  address: string;
}

export default function CampaignItem({ address }: IProps) {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='inherit' color='text.secondary' gutterBottom>
          {address}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/campaigns/${address}`}>
          <Button size='small'>View Campaign</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
