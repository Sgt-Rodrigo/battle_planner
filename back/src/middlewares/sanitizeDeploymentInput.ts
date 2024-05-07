import {Request, Response, NextFunction} from 'express';

export default function sanitizeDeploymentInput(req:Request, res:Response, next:NextFunction){ 
       
    const { date, time, location, gameMode } = req.body;

    const errors:any = {};

    //w Date validation
    if (!date) {
        errors.date = 'Required';
    } else {
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(date)) {
            errors.date = 'Invalid date format. Please use dd-mm-yyyy';
        } else {
            const dateParts = date.split('-');
            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
            const year = parseInt(dateParts[2], 10);

            const selectedDate = new Date(year, month, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate <= today) {
                errors.date = 'Date must be in the future';
            }

            if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
                errors.date = 'Events are only available on weekdays (Monday to Friday)';
            }
        }
    }

    //w Time validation
    if (!time) {
        errors.time = 'Required';
    } else if (time === 'Time') {
        errors.time = 'Invalid time';
    } else {
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
            errors.time = 'Invalid time format';
        } else if (hours < 9 || hours > 20 || (hours === 20 && minutes !== 0)) {
            errors.time = 'Time must be between 9:00 and 20:00';
        }
    }

    //w Location validation
    if (!location) {
        errors.location = 'Required';
    } else if (location === 'Location') {
        errors.location = 'Invalid location';
    }

    //w Game mode validation
    if (!gameMode || gameMode === 'Game Mode') {
        errors.gameMode = 'Please select a game mode';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    next();

} 