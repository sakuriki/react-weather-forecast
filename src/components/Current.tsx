import React from 'react';

export const Current = ({
  current,
  weekly,
}: {
  current: any;
  weekly: Array<any>;
}) => {
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

  return (
    <div className="mt-10 w-full justify-center container mx-auto">
      <div className="flex flex-wrap w-full lg:w-auto">
        <div className="w-full lg:w-1/2 flex rounded-lg bg-auto">
          <div className="rounded-lg py-6 px-8 w-full bg-blue-400 opacity-90 text-white">
            <div>
              <h2 className="font-bold text-3xl leading-none pb-1">
                {getDayOfWeek(current.dt)}
              </h2>
              <h3 className="leading-none pb-2 pl-1">
                {getFormattedDate(current.dt)}
              </h3>
              <p className="flex items-center opacity-75 gap-1">
                <i className="fa-solid fa-location-dot"></i>
                {current.name}, {current.sys.country}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
                alt={current.weather[0].description}
              ></img>
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">
                  {Math.round(current.main.temp)}°
                </div>
                <div className="flex flex-col items-center ml-6">
                  <div className="first-letter:capitalize">
                    {current.weather[0].description}
                  </div>
                  <div className="mt-1 flex gap-1">
                    <span className="text-sm">
                      <i className="fa-solid fa-temperature-arrow-up"></i>
                    </span>
                    <span className="text-sm font-light">
                      {Math.round(weekly[0].temp.max)}°C
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-sm">
                      <i className="fa-solid fa-temperature-arrow-down"></i>
                    </span>
                    <span className="text-sm font-light">
                      {Math.round(weekly[0].temp.min)}°C
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
              <div className="w-auto text-right">{current.main.humidity} %</div>
            </div>
            <div className="flex justify-between mb-8 w-full">
              <div className="w-auto font-bold uppercase text-90">Gió</div>
              <div className="w-auto text-right">
                {Math.round(current.wind.speed * 3.6)} km/h (
                {getCardinalDirection(current.wind.deg)})
              </div>
            </div>
            <div className="flex justify-between mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">
                Mặt trời mọc
              </div>
              <div className="w-auto text-right">
                {getFormattedTime(current.sys.sunrise + current.timezone)}
              </div>
            </div>
            <div className="flex justify-between mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">
                Mặt trời lặn
              </div>
              <div className="w-auto text-right">
                {getFormattedTime(current.sys.sunset + current.timezone)}
              </div>
            </div>
            <div className="flex justify-between mb-4 w-full">
              <div className="w-auto font-bold uppercase text-90">Tầm nhìn</div>
              <div className="w-auto text-right">{current.visibility} mét</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
