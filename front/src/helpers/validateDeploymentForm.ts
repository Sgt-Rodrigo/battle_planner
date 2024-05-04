import { FormikErrors } from 'formik';
import { DeploymentFormValues } from '../typings/types/DeploymentFormValues';

export const validateDeploymentForm = (values: DeploymentFormValues) => {
    const errors: FormikErrors<DeploymentFormValues> = {};
  
 //w Date validation
if (!values.date) {
  errors.date = 'Required';
} else {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/; // Updated regex for dd-mm-yyyy format
  if (!dateRegex.test(values.date)) {
    errors.date = 'Invalid date format. Please use dd-mm-yyyy';
  } else {
    const dateParts = values.date.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const year = parseInt(dateParts[2], 10);

    const selectedDate = new Date(year, month, day);
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
} else if (values.time === 'Time') {
    errors.time = 'Invalid time';
} else {
    const [hours, minutes] = values.time.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        errors.time = 'Invalid time format';
    } else if (hours < 9 || hours > 20 || (hours === 20 && minutes !== 0)) {
        errors.time = 'Time must be between 9:00 and 20:00';
    }
}

//w Location validation
if (!values.location) {
    errors.location = 'Required';
} else if (values.location === 'Location') {
    errors.location = 'Invalid location';
}

//w Game mode validation
if (!values.gameMode || values.gameMode === 'Game Mode') {
  errors.gameMode = 'Please select a game mode';
}

  
    return errors
  }
  