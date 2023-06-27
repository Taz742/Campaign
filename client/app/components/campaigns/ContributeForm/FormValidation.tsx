import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IContributeFormValidation {
  value: number;
}

const schema = yup
  .object<IContributeFormValidation>()
  .shape({
    value: yup.number().required('Ivalid value'),
  })
  .required();

export default yupResolver(schema);
