import { Request, Response, NextFunction } from "express";

export default function sanitizeLoginInput(req: Request, res: Response, next: NextFunction) {
    const { usrName, password } = req.body;
    const errors: any = {};

    //w Username validation
    if (!usrName) {
        errors.usrName = 'Username is required';
    } else if (usrName.length > 20) {
        errors.usrName = 'Username must be 20 characters or less';
    } else if (!/^[a-zA-Z0-9_]+$/.test(usrName)) {
        errors.usrName = 'Only letters, numbers, and underscores, spaces are not allowed';
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
