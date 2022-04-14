import React, { useState, useEffect } from 'react';
import WeatherService from '../services/WeatherService';

interface DTO {
  lat: number;
  lon: number;
  today: any;
}

export const Current = ({ lat, lon, today }: DTO) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDayOfWeek = (time: number): string => {
    let dateTime = new Date(time * 1000);
    return dateTime.toLocaleString('vi-VN', { weekday: 'long' });
  };

  const getFormattedDate = (time: number): string => {
    let dateTime = new Date(time * 1000);
    return dateTime.toLocaleString('vi-VN', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFormattedTime = (time: number): string => {
    let dateTime = new Date(time * 1000);
    return dateTime.toLocaleString('vi-VN', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC',
    });
  };

  const getCardinalDirection = (angle: number): string => {
    const directions = [
      '↑ N',
      '↗ NE',
      '→ E',
      '↘ SE',
      '↓ S',
      '↙ SW',
      '← W',
      '↖ NW',
    ];
    return directions[Math.round(angle / 45) % 8];
  };

  useEffect(() => {
    WeatherService.getCurrent({ lat, lon })
      .then((response: any) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [lat, lon]);

  if (!isLoading) {
    return (
      <div className="mt-10 w-full justify-center container mx-auto">
        <div className="flex flex-wrap w-full lg:w-auto">
          <div className="w-full lg:w-1/2 flex rounded-lg bg-auto">
            <div className="rounded-lg py-6 px-8 w-full bg-blue-400 opacity-90 text-white">
              <div>
                <h2 className="font-bold text-3xl leading-none pb-1">
                  {getDayOfWeek(data.dt)}
                </h2>
                <h3 className="leading-none pb-2 pl-1">
                  {getFormattedDate(data.dt)}
                </h3>
                <p className="flex items-center opacity-75 gap-1">
                  <i className="fa-solid fa-location-dot"></i>
                  {data.name}, {data.sys.country}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                  alt={data.weather[0].description}
                ></img>
                <div className="flex flex-row items-center justify-center mt-6">
                  <div className="font-medium text-6xl">
                    {Math.round(data.main.temp)}°
                  </div>
                  <div className="flex flex-col items-center ml-6">
                    <div className="first-letter:capitalize">
                      {data.weather[0].description}
                    </div>
                    <div className="mt-1 flex gap-1">
                      <span className="text-sm">
                        <i className="fa-solid fa-temperature-arrow-up"></i>
                      </span>
                      <span className="text-sm font-light">
                        {Math.round(today.temp.max)}°C
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-sm">
                        <i className="fa-solid fa-temperature-arrow-down"></i>
                      </span>
                      <span className="text-sm font-light">
                        {Math.round(today.temp.min)}°C
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex ml-0">
            <div className="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
              <div className="flex justify-between mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">Độ ẩm</div>
                <div className="w-auto text-right">{data.main.humidity} %</div>
              </div>
              <div className="flex justify-between mb-8 w-full">
                <div className="w-auto font-bold uppercase text-90">Gió</div>
                <div className="w-auto text-right">
                  {Math.round(data.wind.speed * 3.6)} km/h (
                  {getCardinalDirection(data.wind.deg)})
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">
                  Mặt trời mọc
                </div>
                <div className="w-auto text-right">
                  {getFormattedTime(data.sys.sunrise + data.timezone)}
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">
                  Mặt trời lặn
                </div>
                <div className="w-auto text-right">
                  {getFormattedTime(data.sys.sunset + data.timezone)}
                </div>
              </div>
              <div className="flex justify-between mb-4 w-full">
                <div className="w-auto font-bold uppercase text-90">
                  Tầm nhìn
                </div>
                <div className="w-auto text-right">{data.visibility} mét</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};
