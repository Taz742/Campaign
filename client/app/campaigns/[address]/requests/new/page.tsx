'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormNumberInput from '@/app/components/UI/Form/FormNumberInput';
import FormInput from '@/app/components/UI/Form/FormInput';
import formExampleResolver, {
  ICreateRequestFormValidation,
} from './FormValidation';

import { Alert, Box, Grid, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Layout from '@/app/components/layout';
import campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';

const defaultValues: ICreateRequestFormValidation = {
  amount: 0.001,
  description: '',
  recipient: '',
};

interface IProps {
  params: {
    address: string;
  };
}

function CreateCampaignRequest({ params }: IProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const methods = useForm<ICreateRequestFormValidation>({
    values: defaultValues,
    resolver: formExampleResolver,
  });

  const { handleSubmit } = methods;

  const handleFormSubmit: SubmitHandler<ICreateRequestFormValidation> = async (
    data
  ) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await (web3 as any).eth.getAccounts();
      await (campaign(params.address).methods.createRequest as any)(
        data.description,
        web3.utils.toWei(data.amount, 'ether'),
        data.recipient
      ).send({
        from: accounts[0],
      });

      router.push(`/campaigns/${params.address}/requests`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>{`${loading ? 'Creating' : 'Create a '} request`}</h1>
      <Box>
        {errorMessage && (
          <Alert severity='error' sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormInput name='description' label='Description' />
              </Grid>
              <Grid item xs={4}>
                <FormNumberInput
                  name='amount'
                  label='Amount'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='start'>Ether</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <FormInput name='recipient' label='Recipient' />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              type='submit'
              variant='outlined'
              sx={{ mt: 2 }}
            >
              Submit
            </LoadingButton>
          </form>
        </FormProvider>
      </Box>
    </Layout>
  );
}

export default CreateCampaignRequest;
