'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import FormNumberInput from '@/app/components/UI/Form/FormNumberInput';
import formExampleResolver, { IFormExample } from './FormValidation';

import { Alert, Box, InputAdornment } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Layout from '@/app/components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

const defaultValues: IFormExample = {
  minimumContribution: 100,
};

function CreateCampaign() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const methods = useForm<IFormExample>({
    values: defaultValues,
    resolver: formExampleResolver,
  });

  const { handleSubmit } = methods;

  const handleFormSubmit: SubmitHandler<IFormExample> = async (data) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await (web3 as any).eth.getAccounts();
      await (factory.methods.createCampaign as any)(
        data.minimumContribution
      ).send({
        from: accounts[0],
      });

      router.push('/');
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>{`${loading ? 'Creating' : 'Create a '} campaign`}</h1>
      <Box>
        {errorMessage && (
          <Alert severity='error' sx={{ mb: 4 }}>
            {errorMessage}
          </Alert>
        )}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormNumberInput
              name='minimumContribution'
              label='Minimum contribution'
              decimalScale={0}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='start'>WEI</InputAdornment>
                ),
              }}
            />
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

export default CreateCampaign;
