import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../src/core/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('не вызывает fn сразу после вызова обёртки', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });

  it('вызывает fn через delay мс', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('сбрасывает таймер при повторном вызове', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50); // 100 мс от первого, но только 50 от второго
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50); // 100 мс от второго
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('передаёт аргументы последнего вызова', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    debounced('b');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('b');
  });

  it('сохраняет this', () => {
    const fn = vi.fn();
    const obj = { debounced: debounce(fn, 100) };
    obj.debounced();
    vi.advanceTimersByTime(100);
    expect(fn.mock.instances[0]).toBe(obj);
  });

  it('вызывает fn ровно один раз при серии быстрых вызовов', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    debounced();
    debounced();
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
