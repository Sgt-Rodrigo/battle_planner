import { NextFunction, Request, Response } from "express";

const auth = (req:Request, res:Response, next:NextFunction)=>{
    const {token} = req.headers;

    if(token === 'authenticated') {
        next();
    } else {
        res.status(401).json({message: "Error. Authentication Failed"})
    }
}


export default auth;