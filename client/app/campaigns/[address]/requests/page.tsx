import CampaignRequests from '@/app/components/campaigns/CampaignRequestsList/CampaignRequestsList';
import Layout from '@/app/components/layout';
import Campaign from '@/app/ethereum/campaign';
import { ICampaignRequest } from '@/app/interfaces/campaign';

const fetchRequests = async (
  address: string
): Promise<[ICampaignRequest[], number, number]> => {
  const campaign = Campaign(address) as any;
  const requestsCount = Number(
    await campaign.methods.getRequestsCount().call()
  );
  const approversCount = Number(await campaign.methods.approversCount().call());

  const requests = await Promise.all(
    Array(requestsCount)
      .fill(undefined)
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return [requests, approversCount, requestsCount];
};

interface IProps {
  params: {
    address: string;
  };
}

const Requests = async ({ params }: IProps) => {
  const [requests, approversCount, requestsCount] = await fetchRequests(
    params.address
  );

  return (
    <Layout>
      <CampaignRequests
        address={params.address}
        requests={requests}
        approversCount={approversCount}
        requestsCount={requestsCount}
      />
    </Layout>
  );
};

export default Requests;
