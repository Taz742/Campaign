'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IProps {
  header: string | number;
  label: string;
  description: string;
}

export default function CampaignSummaryItem({
  header,
  label,
  description,
}: IProps) {
  return (
    <Card
      variant='outlined'
      sx={{
        wordWrap: 'break-word',
        height: '100%',
      }}
    >
      <CardContent>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {header}
        </Typography>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {label}
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
