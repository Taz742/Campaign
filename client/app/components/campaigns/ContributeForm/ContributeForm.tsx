'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import formExampleResolver, {
  IContributeFormValidation,
} from './FormValidation';
import FormNumberInput from '@/app/components/UI/Form/FormNumberInput';

import { Alert, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Campaign from '@/app/ethereum/campaign';

import web3 from '@/app/ethereum/web3';

interface IProps {
  address: string;
}

const defaultValues: IContributeFormValidation = {
  value: 0.001,
};

export default function ContributeForm({ address }: IProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const methods = useForm<IContributeFormValidation>({
    values: defaultValues,
    resolver: formExampleResolver,
  });

  const { handleSubmit } = methods;

  const handleFormSubmit: SubmitHandler<IContributeFormValidation> = async ({
    value,
  }) => {
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await Campaign(address)
        .methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether'),
        });

      router.replace(`/campaigns/${address}`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormNumberInput
          name='value'
          label='Amount to contribute'
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>Ether</InputAdornment>
            ),
          }}
        />
        {errorMessage && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <LoadingButton
          loading={loading}
          type='submit'
          variant='outlined'
          sx={{ mt: 2 }}
        >
          Contribute
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
