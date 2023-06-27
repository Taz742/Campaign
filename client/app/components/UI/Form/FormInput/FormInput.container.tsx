import { memo } from 'react';

import {
  useFormContext,
  Controller,
  useFormState,
  FieldValues,
  Path,
} from 'react-hook-form';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import FormError from '../FormError';

export interface IProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  disabled?: boolean;
  label?: string;
  readOnly?: boolean;
}

const FormInput = <TFieldValues extends FieldValues>({
  name,
  disabled,
  label,
  readOnly,
}: IProps<TFieldValues>) => {
  const { control } = useFormContext();
  const { errors } = useFormState({ control });

  const error = errors && errors[name];

  return (
    <FormControl error fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const { name, value, onChange, onBlur } = field;
          return (
            <TextField
              fullWidth
              error={!!error}
              inputProps={{
                readOnly,
                disabled,
              }}
              label={label}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          );
        }}
      />
      <FormError errors={errors} name={name} />
    </FormControl>
  );
};

export default memo(FormInput);
