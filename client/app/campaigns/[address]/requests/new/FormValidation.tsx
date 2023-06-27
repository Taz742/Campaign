import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface ICreateRequestFormValidation {
  description: string;
  amount: number;
  recipient: string;
}

const schema = yup
  .object<ICreateRequestFormValidation>()
  .shape({
    description: yup.string().required('Description is required'),
    amount: yup.number().required('Ivalid value'),
    recipient: yup.string().required('Recipient is required'),
  })
  .required();

export default yupResolver(schema);
