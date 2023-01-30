export interface IError {
    errorCode: number;
    errorDescription : string;
    context: any;
    error: unknown;
}