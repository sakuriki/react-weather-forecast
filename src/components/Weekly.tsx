import React from 'react';

export const WeeklyWeather = ({ weekly }: { weekly: Array<Object> }) => {
  const getDayOfWeek = (time: number): string => {
    let dateTime = new Date(time * 1000);
    return dateTime.toLocaleString('vi-VN', { weekday: 'long' });
  };

  const getFormattedDate = (time: number): string => {
    let dateTime = new Date(time * 1000);
    return dateTime.toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="py-5">
      <div className="flex flex-row gap-5">
        {weekly.slice(1).map((day: any, index: number) => {
          return (
            <div
              key={index}
              className="w-64 cursor-pointer border b-gray-400 rounded flex flex-col justify-center items-center text-center p-6 bg-white"
            >
              <div className="text-md font-bold flex flex-col text-gray-900">
                <span className="uppercase">{getDayOfWeek(day.dt)}</span>
                <span className="font-normal text-gray-700 text-sm">
                  {getFormattedDate(day.dt)}
                </span>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                  alt={day.weather[0].description}
                ></img>
              </div>
              <p className="text-gray-700 mb-2 first-letter:capitalize">
                {day.weather[0].description}
              </p>
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {Math.round(day.temp.max)}º
                <span className="font-normal text-gray-700 mx-1">/</span>
                {Math.round(day.temp.min)}º
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center text-gray-700 px-2 gap-1">
                  <i className="fa-solid fa-droplet"></i>
                  {day.humidity}%
                </div>
                <div className="flex items-center text-gray-700 px-2 gap-1">
                  <i className="fa-solid fa-wind"></i>
                  {Math.round(day.wind_speed * 3.6)}km/h
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
