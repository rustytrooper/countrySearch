import { describe, it, expect } from 'vitest';
import {
  HttpError,
  isAbortError,
  isTimeoutError,
  isHttpError,
  isNetworkError,
} from '../src/core/errors';

describe('HttpError', () => {
  it('является экземпляром Error и HttpError', () => {
    const error = new HttpError(500);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(HttpError);
  });

  it('сохраняет статус', () => {
    const error = new HttpError(503);
    expect(error.status).toBe(503);
  });

  it('устанавливает name в "HttpError"', () => {
    const error = new HttpError(500);
    expect(error.name).toBe('HttpError');
  });

  it('использует дефолтное сообщение со статусом, если message не передан', () => {
    const error = new HttpError(500);
    expect(error.message).toContain('500');
  });

  it('использует кастомное сообщение, если передано', () => {
    const error = new HttpError(500, 'Server is down');
    expect(error.message).toBe('Server is down');
  });

  it('status доступен только для чтения (readonly на уровне типа)', () => {
    const error = new HttpError(500);
    // @ts-expect-error — проверяем, что TS запрещает присваивание
    error.status = 404;
  });
});

describe('error predicates', () => {
  describe('isAbortError', () => {
    it('возвращает true для DOMException с name="AbortError"', () => {
      const error = new DOMException('Aborted', 'AbortError');
      expect(isAbortError(error)).toBe(true);
    });

    it('возвращает false для DOMException с name="TimeoutError"', () => {
      const error = new DOMException('Timeout', 'TimeoutError');
      expect(isAbortError(error)).toBe(false);
    });

    it('возвращает false для обычной Error', () => {
      expect(isAbortError(new Error('boom'))).toBe(false);
    });

    it('возвращает false для не-объекта', () => {
      expect(isAbortError('AbortError')).toBe(false);
      expect(isAbortError(null)).toBe(false);
      expect(isAbortError(undefined)).toBe(false);
    });
  });

  describe('isTimeoutError', () => {
    it('возвращает true для DOMException с name="TimeoutError"', () => {
      const error = new DOMException('Timeout', 'TimeoutError');
      expect(isTimeoutError(error)).toBe(true);
    });

    it('возвращает false для DOMException с name="AbortError" (не путать!)', () => {
      const error = new DOMException('Aborted', 'AbortError');
      expect(isTimeoutError(error)).toBe(false);
    });

    it('возвращает false для обычной Error', () => {
      expect(isTimeoutError(new Error('boom'))).toBe(false);
    });
  });

  describe('isHttpError', () => {
    it('возвращает true для HttpError', () => {
      expect(isHttpError(new HttpError(500))).toBe(true);
    });

    it('возвращает false для обычной Error', () => {
      expect(isHttpError(new Error('boom'))).toBe(false);
    });

    it('возвращает false для DOMException', () => {
      expect(isHttpError(new DOMException('Aborted', 'AbortError'))).toBe(false);
    });
  });

  describe('isNetworkError', () => {
    it('возвращает true для TypeError (fetch при обрыве сети)', () => {
      expect(isNetworkError(new TypeError('Failed to fetch'))).toBe(true);
    });

    it('возвращает false для HttpError', () => {
      expect(isNetworkError(new HttpError(500))).toBe(false);
    });

    it('возвращает false для DOMException', () => {
      expect(isNetworkError(new DOMException('Aborted', 'AbortError'))).toBe(false);
    });
  });
});
