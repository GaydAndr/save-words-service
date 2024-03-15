interface MongoError extends Error{
    name: string;
    code: number;
    status?: number
}

const isConflict = (error: MongoError): boolean =>
    error.name === 'MongoServerError' && error.code === 11000

const handleSaveErrors = (error: MongoError, _: any, next: Function) => {
    if (error) {
        error.status = isConflict(error) ? 409 : 400
    }
    next()
}

export default handleSaveErrors