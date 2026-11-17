export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message?: string) {
    super(message ?? `HTTP error ${String(status)}`);
    this.name = 'HttpError';
    this.status = status;
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function isTimeoutError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'TimeoutError';
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof TypeError;
}
