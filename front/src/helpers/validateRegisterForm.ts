import { FormikErrors } from 'formik';
import FormValues from '../typings/interfaces/FormValues';

export const validateRegisterForm = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  //w Email validation
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  //w User Name validation
  if (!values.usrName) {
    errors.usrName = 'Username is required';
  } else if (values.usrName.length > 20) {
    errors.usrName = 'Username must be 20 characters or less';
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.usrName)) {
    errors.usrName = 'Only letters, numbers, and underscores, spaces are not allowed';
  }  

  //w Birthdate Validation
  if (!values.birthDate) {
    errors.birthDate = 'Required';
  } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(values.birthDate)) {
    errors.birthDate = 'Invalid date format (dd/mm/yyyy)'
  } const parts = values.birthDate.split('/');
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    errors.birthDate = 'Invalid Day or Month';
  } else {
    const birthYear = Number(parts[2]);
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear > 120) {
      errors.birthDate = 'Stop trolling mate, enter a proper year';
    }
  }

  //w National Id validation
  if (!values.nationalId) {
    errors.nationalId = 'National ID is required';
  } else if (!/^\d+$/.test(values.nationalId)) {
    errors.nationalId = 'National ID must contain only numbers';
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

  //w Confirm password validation
  if (!values.confirm) {
    errors.confirm = 'Confirm Password is required';
  } else if (values.password !== values.confirm) {
    errors.confirm = 'Passwords do not match';
  }

  return errors;
}

