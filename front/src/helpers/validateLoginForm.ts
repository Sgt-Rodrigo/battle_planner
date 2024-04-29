import { FormikErrors } from 'formik';
import {LoginValues} from '../typings/interfaces/FormValues';

export const validateLoginForm = (values: LoginValues) => {
  const errors: FormikErrors<LoginValues> = {};

  //w usrName validation
  if (!values.usrName) {
    errors.usrName = 'Username is required';
  } else if (values.usrName.length > 20) {
    errors.usrName = 'Username must be 20 characters or less';
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.usrName)) {
    errors.usrName = 'Only letters, numbers, and underscores, spaces are not allowed';
  } 

   //w Password validation
   if (!values.password) {
    errors.password = 'Required';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/i.test(
      values.password
    )
  ) {
    errors.password =
      'Password must be 8 to 20 characters long and contain at least one symbol, one uppercase letter, and one alphanumeric character.';
  } 

  return errors
}

