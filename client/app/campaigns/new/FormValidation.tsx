import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IFormExample {
  minimumContribution: number;
}

const schema = yup
  .object<IFormExample>()
  .shape({
    minimumContribution: yup.number().required('Ivalid value'),
  })
  .required();

export default yupResolver(schema);
