import { Metadata } from 'next';

import factory from './ethereum/factory';
import CampaignsList from './components/campaigns/CampaignList/CampaignsList';

export const metadata: Metadata = {
  title: 'Next.js',
};

export async function getDeployedCampaigns() {
  const deployedCampaigns = (await factory.methods
    .getDeployedCampaigns()
    .call()) as string[];
  return deployedCampaigns;
}

export default async function Home() {
  const campaigns = await getDeployedCampaigns();

  return <CampaignsList campaigns={campaigns} />;
}
