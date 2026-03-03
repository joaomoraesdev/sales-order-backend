import { AbstractError } from './abstract';

export class ServerError extends AbstractError {
    constructor(message = 'internalServerError', stack: string) {
        super(message, 500, stack);
    }

    public get message(): string {
        return this.message;
    }
}
