import { Request, Response, NextFunction } from "express";

export default function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    const { usrName, email, birthDate, nationalId, password } = req.body;
    const errors: any = {};

    //  //w validates username
     if (!usrName) {
        errors.usrName = 'Username is required';
    } else if (usrName.length < 3 || usrName.length > 20) {
        errors.usrName = 'Username must be between 3 and 20 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(usrName)) {
        errors.usrName = 'Only letters, numbers, and underscores, spaces are not allowed';
    }

    //w Email validation
  if (!email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    errors.email = 'Invalid email address';
  }

  //w Birthdate validation
  if (!birthDate) {
    errors.birthDate = 'Birthdate is required';
} else if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(birthDate)) {
    errors.birthDate = 'Invalid date format (dd-mm-yyyy)';
} else {
    const parts = birthDate.split('-');
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; //w Month is zero-based
    const currentDay = currentDate.getDate();

    if (day < 1 || day > 31 || month < 1 || month > 12) {
        errors.birthDate = 'Invalid Day or Month';
    } else if (currentYear - year < 16 || (currentYear - year === 16 && (month > currentMonth || (month === currentMonth && day > currentDay)))) {
        errors.birthDate = 'You must be at least 16 years old';
    } else if (year < currentYear - 120 || year > currentYear) {
        errors.birthDate = 'Quit trolling. Enter a year between ' + (currentYear - 120) + ' and ' + currentYear;
    }
}

//w National ID validation
if (!nationalId) {
    errors.nationalId = 'National ID is required';
} else if (!/^\d{1,8}$/.test(nationalId)) {
    errors.nationalId = 'National ID must be a number with a maximum of 8 digits';
}

//w Password validation
if (!password) {
    errors.password = 'Password is required';
} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(password)) {
    errors.password = 'Password must be 8 to 20 characters long and contain at least one symbol, one uppercase letter, and one alphanumeric character.';
}


    //w checks if there are any validation errors
    if (Object.keys(errors).length > 0) {
        //w returns a 400 response with the validation errors
        return res.status(400).json({ errors });
    }

    next(); //w Proceed to the next middleware
}
