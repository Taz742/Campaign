import CampaignView from '@/app/components/campaigns/CampaignView/CampaignView';
import Layout from '@/app/components/layout';
import Campaign from '@/app/ethereum/campaign';
import { ICampaignSummary } from '@/app/interfaces/campaign';

const fetchData = async (address: string): Promise<ICampaignSummary> => {
  const summary = (await Campaign(address).methods.getSummary().call()) as [
    number,
    BigInt,
    number,
    number,
    string
  ];

  return {
    minimumContribution: Number(summary[0]),
    balance: summary[1],
    requestsCount: Number(summary[2]),
    approversCount: Number(summary[3]),
    manager: summary[4],
  };
};

interface IProps {
  params: {
    address: string;
  };
}

async function ViewCampaign({ params }: IProps) {
  const summary = await fetchData(params.address);

  return (
    <Layout>
      <CampaignView summary={summary} address={params.address} />
    </Layout>
  );
}

export default ViewCampaign;
