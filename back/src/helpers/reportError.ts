import { Response } from "express";

export function reportError(error: unknown, status: number, res: Response) {
    if (error instanceof Error) {
        return res.status(status).json({ message: error.message });
    } else {
        console.error("An error occurred:", error);
        return res.status(status).json({ message: "An error occurred." });
    }
}