import { memo } from 'react';

import {
  useFormContext,
  Controller,
  useFormState,
  FieldValues,
  Path,
} from 'react-hook-form';

import { NumericFormat, NumberFormatValues } from 'react-number-format';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import FormError from '../FormError';

export type IProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  format?: string;
  suffix?: string;
  prefix?: string;
  decimalScale?: number;
  disabled?: boolean;
  readOnly?: boolean;
  label?: string;
  InputProps?: any;
  isAllowed?: () => boolean;
};

const FormNumberInput = <TFieldValues extends FieldValues>({
  name,
  disabled,
  decimalScale,
  readOnly,
  prefix,
  suffix,
  label,
  InputProps,
  isAllowed,
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
          const { name, value, onBlur, ref } = field;
          const { onChange } = field as any;
          return (
            <NumericFormat
              customInput={TextField}
              decimalScale={decimalScale}
              decimalSeparator={'.'}
              disabled={disabled}
              displayType={readOnly ? 'text' : 'input'}
              error={!!error}
              getInputRef={ref}
              isAllowed={isAllowed}
              label={label}
              name={name}
              prefix={prefix}
              suffix={suffix}
              value={value}
              onBlur={onBlur}
              InputProps={InputProps}
              onValueChange={(value: NumberFormatValues) =>
                onChange(value.floatValue)
              }
            />
          );
        }}
      />
      <FormError errors={errors} name={name} />
    </FormControl>
  );
};

export default memo(FormNumberInput);
