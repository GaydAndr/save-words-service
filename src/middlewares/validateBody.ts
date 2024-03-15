import {Schema} from 'joi';
import {NextFunction} from "express";
import {RequestError} from "../helpers";

const validateBody = (schema:Schema)=>{
    return (req: Request, _: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body)
        if (error) {
            next(new RequestError(400, error.message))
        }
        next()
    }
}

export default validateBody