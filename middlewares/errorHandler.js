const { Prisma } = require("@prisma/client")

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.name = this.constructor.name;
    }
}

class PrismaError extends Error {

    constructor(message, prismaErr) {
        super(message);
        this.statusCode = 400;
        this.name = this.constructor.name;
    }
}

function PrismaErrorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log("Prisma Error: ", err);

        const { code, message } = err
        switch (code) {
            case 'P2002':
                return next(new PrismaError(message.split('\n').pop(), err))

            case 'P2025':
                return next(new PrismaError(message.split('\n').pop(), err))

            default:
                return next(new PrismaError(`Prisma Known Request Error:${message.split('\n').pop()}`, err))
        }
    }
    else if (err instanceof Prisma.PrismaClientValidationError) {
        const { code, message } = err
        return next(new PrismaError(`Prisma Validation Error:${message.split('\n').pop()}`, err))
    }
    else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        const { code, message } = err
        return next(new PrismaError(`Prisma Unknown Request Error:${message.split('\n').pop()}`, err))
    }
    else if (err instanceof Prisma.PrismaClientInitializationError) {
        const { code, message } = err
        return next(new PrismaError(`Prisma Initialization Error:${message.split('\n').pop()}`, err))
    }
    else if (err instanceof Prisma.PrismaClientRustPanicError) {
        const { code, message } = err
        return next(new PrismaError(`Prisma Rust Panic Error:${message.split('\n').pop()}`, err))
    }
    else {
        return next(err)
    }
}

function ErrorHandler(err, req, res, next) {
    console.error('ERROR : ', err.message);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: false,
            message: err.message || 'Internal Server Error',
            data: null
        });
    } else {
        res.status(500).json({
            status: false,
            message: err.message || 'Internal Server Error',
            data: null
        });
    }
}

function Handle404(req, res, next) {
    res.status(404).json({
        status: false,
        message: 'Oops! Page not found.',
        data: {
            method: req.method,
            requestedUrl: req.originalUrl,
        }
    });
}

module.exports = {
    ErrorHandler,
    Handle404,
    PrismaErrorHandler,
    AppError
}