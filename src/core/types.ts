export interface RawCountryLanguage {
  name: string;
}

export interface RawCountryCurrency {
  code: string;
  name: string;
  symbol: string | null;
}

export interface RawCountryFlags {
  png: string;
  svg: string;
}

export interface RawCountry {
  name: string;
  flags: RawCountryFlags;
  region: string;
  population: number;
  area: number;
  alpha2Code: string;
  alpha3Code: string;

  capital?: string | null;
  subregion?: string | null;
  borders?: string[];
  languages?: RawCountryLanguage[];
  currencies?: RawCountryCurrency[];
  timezones?: string[];
  nativeName?: string | null;
  demonym?: string | null;
}

export interface CountryCurrency {
  code: string;
  name: string;
  symbol: string | null;
}

export interface Country {
  name: string;
  flag: string;
  capital: string | null;
  region: string;
  population: number;
  languages: string[];

  area: number;
  borders: string[];
  currencies: CountryCurrency[];
  subregion: string | null;
  timezones: string[];
  alpha2Code: string;
  alpha3Code: string;
  nativeName: string | null;
  demonym: string | null;
}
