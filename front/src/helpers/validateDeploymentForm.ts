import { FormikErrors } from 'formik';
import { DeploymentFormValues } from '../typings/types/DeploymentFormValues';

export const validateDeploymentForm = (values: DeploymentFormValues) => {
    const errors: FormikErrors<DeploymentFormValues> = {};
  
 // Date validation
if (!values.date) {
  errors.date = 'Required';
} else {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(values.date)) {
    errors.date = 'Invalid date format. Please use yyyy-mm-dd';
  } else {
    const selectedDate = new Date(values.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to start of day for comparison

    if (selectedDate <= today) {
      errors.date = 'Date must be in the future';
    }
  }
}

  //w Time validation
  if (!values.time) {
    errors.time = 'Required';
  } else {
    const [hours, minutes] = values.time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      errors.time = 'Invalid time format';
    } else if (hours < 9 || hours > 20 || (hours === 20 && minutes !== 0)) {
      errors.time = 'Time must be between 9:00 and 20:00';
    }
  }
  
    return errors
  }
  