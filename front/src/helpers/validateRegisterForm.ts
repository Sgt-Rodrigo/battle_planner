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
} else if (values.usrName.length < 3 || values.usrName.length > 20) {
  errors.usrName = 'Username must be between 3 and 20 characters';
} else if (!/^[a-zA-Z0-9_]+$/.test(values.usrName)) {
  errors.usrName = 'Only letters, numbers, and underscores, spaces are not allowed';
}

//w Birthdate Validation
if (!values.birthDate) {
  errors.birthDate = 'Required';
} else if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(values.birthDate)) {
  errors.birthDate = 'Invalid date format (dd-mm-yyyy)';
} else {
  const parts = values.birthDate.split('-');
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);

  if (day < 1 || day > 31 || month < 1 || month > 12) {
    errors.birthDate = 'Invalid Day or Month';
  } else {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based
    const currentDay = currentDate.getDate();

    if (currentYear - year < 16 || (currentYear - year === 16 && (month > currentMonth || (month === currentMonth && day > currentDay)))) {
      errors.birthDate = 'You must be at least 16 years old';
    } else if (year < currentYear - 120 || year > currentYear) {
      errors.birthDate = 'Quit trolling. Enter a year between ' + (currentYear - 120) + ' and ' + currentYear;
    }
  }
}

  //w National Id validation
  if (!values.nationalId) {
    errors.nationalId = 'National ID is required';
  } else if (!/^\d{1,8}$/.test(values.nationalId)) {
    errors.nationalId = 'National ID must be a number with a maximum of 8 digits';
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

