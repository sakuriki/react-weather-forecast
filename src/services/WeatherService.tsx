import http from '../http-common';

export interface BaseDTO {
  key?: string;
}

export interface OneCallDTO extends BaseDTO {
  lat: number;
  lon: number;
}

export interface GeoDTO extends BaseDTO {
  q: string;
  limit?: number;
}

const getGeocoding = ({
  q,
  limit = 5,
  key = process.env.REACT_APP_API_KEY,
}: GeoDTO) => {
  return http.get(`/geo/1.0/direct?q=${q}&limit=${limit}&appid=${key}`);
};

const getCurrent = ({
  lat,
  lon,
  key = process.env.REACT_APP_API_KEY,
}: OneCallDTO) => {
  return http.get<Object>(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=vi`,
  );
};

const getOneCall = ({
  lat,
  lon,
  key = process.env.REACT_APP_API_KEY,
}: OneCallDTO) => {
  return http.get<Object>(
    `/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=vi&exclude=current,hourly,minutely`,
  );
};

const WeatherService = {
  getOneCall,
  getCurrent,
  getGeocoding,
};

export default WeatherService;
