import { CustomError } from "./base/customError";

export class NotFoundError extends CustomError {
    constructor(
        public message: string
    ){
        super(message, 404)
    }
}