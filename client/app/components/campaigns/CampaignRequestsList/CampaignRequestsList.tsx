'use client';

import Link from 'next/link';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ICampaignRequest } from '@/app/interfaces/campaign';
import web3 from '@/app/ethereum/web3';
import Campaign from '@/app/ethereum/campaign';

interface IProps {
  address: string;
  requests: ICampaignRequest[];
  approversCount: number;
  requestsCount: number;
}

const CampaignRequestsList = ({
  address,
  requests,
  approversCount,
  requestsCount,
}: IProps) => {
  const handleApproveRequest = async (index: number) => {
    const accounts = await web3.eth.getAccounts();

    const campaign = Campaign(address) as any;
    await campaign.methods.approveRequest(index).send({
      from: accounts[0],
    });
  };

  const handleFinalizeRequest = async (index: number) => {
    const accounts = await web3.eth.getAccounts();

    const campaign = Campaign(address) as any;
    await campaign.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <h1>Requests {`(${requestsCount})`}</h1>
        <Link href={`/campaigns/${address}/requests/new`}>
          <Button variant='contained'>Create a new Request</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='left'>Description</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='left'>Recipient</TableCell>
              <TableCell align='right'>Approval Count</TableCell>
              <TableCell align='center'>Approve</TableCell>
              <TableCell align='center'>Finalize</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {index + 1}
                </TableCell>
                <TableCell align='left'>{request.description}</TableCell>
                <TableCell align='right'>
                  {web3.utils.fromWei(request.value, 'ether')}
                </TableCell>
                <TableCell align='left'>{request.recipient}</TableCell>
                <TableCell align='right'>
                  {Number(request.approvalCount)}/{approversCount}
                </TableCell>
                <TableCell align='center'>
                  {request.complete ? null : (
                    <Button
                      variant='outlined'
                      color='success'
                      onClick={() => handleApproveRequest(index)}
                    >
                      Approve
                    </Button>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {request.complete ? null : (
                    <Button
                      variant='outlined'
                      color='info'
                      onClick={() => handleFinalizeRequest(index)}
                    >
                      Finalize
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CampaignRequestsList;
