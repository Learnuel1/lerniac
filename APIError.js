class APIError extends Error {
    constructor(message, status = 500, details = null) {
        super(message);
        this.status = status;
        this.details = details; 
    }

    static notFound(msg = "Resource not found", details = null) {
        return new this(msg, 404, details);
    }

    static badRequest(msg = "Invalid request", details = null) {
        return new this(msg, 400, details);
    }

    static unauthorized(msg = "You don't have the required permission", details = null) {
        return new this(msg, 403, details);
    }

    static unauthenticated(msg = "Please login to access this resource", details = null) {
        return new this(msg, 401, details);
    }

    static customError(msg = "An error occurred", status = 500, details = null) {
        return new this(msg, status, details);
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            ...(this.details && { details: this.details }),
        };
    }
}

module.exports = {
    APIError,
};
