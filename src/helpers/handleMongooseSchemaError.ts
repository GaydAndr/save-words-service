// Інтерфейси для типізації об'єкта помилки
interface MongooseError {
    status: number;
    name: string;
    code: number;
}

// Обробник помилок Mongoose Schema
 const handleMongooseSchemaError = (
    error: MongooseError, // Визначення типу помилки
    data: any,
    next: any
) => {
    const isDuplicate = error.name === 'MongoServerError' && error.code === 11000;
    error.status = isDuplicate ? 409 : 400;
    next();
};

export default handleMongooseSchemaError