export class HttpError extends Error {
  readonly status: number;
  constructor(_status: number, _message?: string) {
    super();
    this.status = _status;
    throw new Error('not implemented');
  }
}
export function isAbortError(_e: unknown): boolean {
  throw new Error('not implemented');
}
export function isTimeoutError(_e: unknown): boolean {
  throw new Error('not implemented');
}
export function isHttpError(_e: unknown): _e is HttpError {
  throw new Error('not implemented');
}
export function isNetworkError(_e: unknown): boolean {
  throw new Error('not implemented');
}
