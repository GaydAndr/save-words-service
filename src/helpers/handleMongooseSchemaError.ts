// Інтерфейси для типізації об'єкта помилки
import {NextFunction, Request, Response} from "express";

interface MongooseError {
    status: number;
    name: string;
    code: number;
}

// Обробник помилок Mongoose Schema
 const handleMongooseSchemaError = (
    error: MongooseError, // Визначення типу помилки
    next: NextFunction
) => {
    const isDuplicate = error.name === 'MongoServerError' && error.code === 11000;
    error.status = isDuplicate ? 409 : 400;
    next();
};

export default handleMongooseSchemaError