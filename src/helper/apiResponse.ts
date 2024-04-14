import { Response } from "express";
import { HttpStatusCode } from "../interfaces/httpstatus";


const successRes = (res: any, results: object | string = '', statusCode: string | number = 200) => {

    const result = {
        status: true,
        code: statusCode,
        data: results
    }

    res.status(+statusCode).json(result);
}

const errorRes = (res: Response, results: object | string = '', statusCode: string | number = 400) => {

    const codes = Object.values(HttpStatusCode);
    // Get matched code
    const findCode = codes.find((code) => code === statusCode);

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    const result = {
        status: false,
        code: 200,
        data: results

    }

    res.status(200).json(result);
}

const validationError = (res: Response, results: object | string = "Validation errors") => {

    const result = {
        status: false,
        code: 422,
        data: results

    }

    res.status(422).json(result);
}

const unauthorized = (res: Response, results: object | string = "Invalid Token", errors: object = {}) => {

    const result = {
        status: false,
        code: 401,
        data: results

    }

    res.status(401).json(result);
}

const nopermission = (res: Response, results: object | string = "You don't have permission to access this content.", errors: object = {}) => {

    const result = {
        status: false,
        code: 403,

        data: results
    }

    res.status(403).json(result);
}
export { successRes, errorRes, validationError, unauthorized, nopermission };