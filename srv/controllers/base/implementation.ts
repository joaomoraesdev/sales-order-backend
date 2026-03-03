import { BaseController, BaseControllerResponse } from './protocols';

export class BaseControllerImpl implements BaseController {
    success(data: unknown): BaseControllerResponse {
        return {
            data,
            status: 200
        };
    }
    error(code: number, message: string): BaseControllerResponse {
        return {
            status: code,
            data: message
        };
    }
}
