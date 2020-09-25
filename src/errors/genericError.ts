import { CustomError } from "./base/customError";

export class GenericError extends CustomError{
    constructor(
        public message: string
    ){
        super(message, 400)
    }
}