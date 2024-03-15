interface ErrorMessageMap {
    [key: number]: string
}

const messages: ErrorMessageMap = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
}

class RequestError extends Error {
    constructor(public status: number, message?: string) {
        super(message || messages[status] || "Unknown Error");
        this.status = status
    }
}

export default RequestError