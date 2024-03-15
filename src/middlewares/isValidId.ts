import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import {RequestError} from "../helpers";

const isValidId = (req: Request, _:Response, next:NextFunction)=>{
    if(isValidObjectId(req.params.id)){
        new RequestError(404,'Not found')
    }
    next();
}

export default isValidId