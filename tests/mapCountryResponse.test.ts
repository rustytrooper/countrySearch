import { describe, it, expect } from 'vitest';
import { mapCountryResponse } from '../src/core/mapCountryResponse';
import type { RawCountry } from '../src/core/types';

const albaniaRaw: RawCountry = {
  name: 'Albania',
  flags: { png: 'https://flagcdn.com/w320/al.png', svg: 'https://flagcdn.com/al.svg' },
  capital: 'Tirana',
  region: 'Europe',
  subregion: 'Southern Europe',
  population: 2837743,
  area: 28748,
  borders: ['MNE', 'GRC', 'MKD', 'UNK'],
  languages: [{ name: 'Albanian' }],
  currencies: [{ code: 'ALL', name: 'Albanian lek', symbol: 'L' }],
  timezones: ['UTC+01:00'],
  alpha2Code: 'AL',
  alpha3Code: 'ALB',
  nativeName: 'Shqipëria',
  demonym: 'Albanian',
};

describe('mapCountryResponse', () => {
  it('мапит полный объект в модель Country', () => {
    const result = mapCountryResponse(albaniaRaw);
    expect(result).toEqual({
      name: 'Albania',
      flag: 'https://flagcdn.com/w320/al.png',
      capital: 'Tirana',
      region: 'Europe',
      population: 2837743,
      languages: ['Albanian'],
      area: 28748,
      borders: ['MNE', 'GRC', 'MKD', 'UNK'],
      currencies: [{ code: 'ALL', name: 'Albanian lek', symbol: 'L' }],
      subregion: 'Southern Europe',
      timezones: ['UTC+01:00'],
      alpha2Code: 'AL',
      alpha3Code: 'ALB',
      nativeName: 'Shqipëria',
      demonym: 'Albanian',
    });
  });

  it('превращает languages в массив строк', () => {
    const result = mapCountryResponse(albaniaRaw);
    expect(result.languages).toEqual(['Albanian']);
  });

  it('берёт flags.png, а не flags.svg', () => {
    const result = mapCountryResponse(albaniaRaw);
    expect(result.flag).toBe('https://flagcdn.com/w320/al.png');
  });

  it('возвращает null для отсутствующей столицы', () => {
    const noCapital: RawCountry = { ...albaniaRaw, capital: null };
    expect(mapCountryResponse(noCapital).capital).toBeNull();
  });

  it('возвращает пустые массивы для отсутствующих borders/languages/currencies', () => {
    const empty: RawCountry = { ...albaniaRaw, borders: [], languages: [], currencies: [] };
    const result = mapCountryResponse(empty);
    expect(result.borders).toEqual([]);
    expect(result.languages).toEqual([]);
    expect(result.currencies).toEqual([]);
  });

  it('возвращает null для отсутствующего symbol в валюте', () => {
    const noSymbol: RawCountry = {
      ...albaniaRaw,
      currencies: [{ code: 'ALL', name: 'Albanian lek', symbol: null }],
    };
    expect(mapCountryResponse(noSymbol).currencies[0]?.symbol).toBeNull();
  });
});
