import {
  City,
  Country,
  CountryState,
  CountryStateCity,
  Language,
  State,
} from "../types";

export const GetCountries = async (): Promise<Country[] | []> => {
  const countries = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/countriesminified.json"
  ).then((res) => res.json());
  return countries as Array<Country>;
};

export const GetLanguages = async (): Promise<Language[] | []> => {
  const countries = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/languagesminified.json"
  ).then((res) => res.json());
  return countries as Array<Language>;
};

export const GetState = async (id: number): Promise<Array<State> | []> => {
  const states = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/statesminified.json"
  ).then((res) => res.json());
  const record = states as Array<CountryState>;
  const statesone = record.find((e: CountryState) => e.id === id);
  const state = statesone && statesone.states ? statesone.states : [];
  return state;
};

export const GetCity = async (
  countryid: number,
  stateid: number
): Promise<Array<City> | []> => {
  const cities = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json"
  ).then((res) => res.json());
  const record = cities as Array<CountryStateCity>;
  const countries = record.find((e: CountryStateCity) => e.id === countryid);
  if (countries) {
    const states = countries && countries.states ? countries.states : [];
    const city = states.find((e) => e.id === stateid);
    console.log("cities s", city && city.cities);
    return city && city.cities ? city.cities : [];
  } else {
    return [];
  }
};

export const GetCityByCountry = async (
  countryid: number,
): Promise<Array<City> | []> => {
  const cities = await fetch(
    "https://venkatmcajj.github.io/react-country-state-city/data/citiesminified.json"
  ).then((res) => res.json());
  const record = cities as Array<CountryStateCity>;
  const countries = record.find((e: CountryStateCity) => e.id === countryid);
  if (countries) {
    const states = countries && countries.states ? countries.states : [];
    const cities = states.map((e) => e.cities).flat();
    console.log("cities", cities);
    return cities ? cities : [];
  } else {
    return [];
  }
};