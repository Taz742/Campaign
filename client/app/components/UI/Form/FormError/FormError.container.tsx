import { DeepMap, FieldError, FieldValues, FieldName } from 'react-hook-form';
import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from '@hookform/error-message';

import FormHelperText from '@mui/material/FormHelperText';

interface IProps<TFieldValues extends FieldValues> {
  name: FieldName<
    FieldValuesFromFieldErrors<Partial<DeepMap<TFieldValues, FieldError>>>
  >;
  errors: Partial<DeepMap<TFieldValues, FieldError>>;
}

const FormError = <TFieldValues extends FieldValues>({
  name,
  errors,
}: IProps<TFieldValues>) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => <FormHelperText>{message}</FormHelperText>}
    />
  );
};

export default FormError;
