import type { Country, RawCountry } from './types';

export function mapCountryResponse(raw: RawCountry): Country {
  return {
    name: raw.name,
    flag: raw.flags.png,
    capital: raw.capital ?? null,
    region: raw.region,
    population: raw.population,
    languages: (raw.languages ?? []).map((language) => language.name),
    area: raw.area,
    borders: raw.borders ?? [],
    currencies: (raw.currencies ?? []).map((currency) => ({
      code: currency.code,
      name: currency.name,
      symbol: currency.symbol ?? null,
    })),
    subregion: raw.subregion ?? null,
    timezones: raw.timezones ?? [],
    alpha2Code: raw.alpha2Code,
    alpha3Code: raw.alpha3Code,
    nativeName: raw.nativeName ?? null,
    demonym: raw.demonym ?? null,
  };
}
