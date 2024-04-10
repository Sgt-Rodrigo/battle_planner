import { Request, Response, NextFunction } from "express";

export default function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
    const { usrName } = req.body;

    if (!usrName) {
        return res.status(400).json({ message: 'Username is required and must be a non-empty string.' });
    }

    if (!isNaN(Number(usrName))) {
        return res.status(400).json({ message: 'Username must not be a number.' });
    }

    next(); // Proceed to the next middleware
}
