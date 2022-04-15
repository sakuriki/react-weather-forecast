import React, { useState, useEffect, Fragment } from 'react';
import { WeeklyWeather } from './components/Weekly';
import { SearchAutocomplete } from './components/SearchAutocomplete';
import { Current } from './components/Current';
import WeatherService from './services/WeatherService';

const App = () => {
  const [lat, setLat] = useState<number>(21.0398439);
  const [lon, setLon] = useState<number>(105.7899318);
  const [current, setCurrent] = useState<Object>({});
  const [weekly, setWeekly] = useState<Array<Object>>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    setIsloading(true);
    async function fetchWeather() {
      let currentData = await WeatherService.getCurrent({ lat, lon });
      setCurrent(currentData.data);
      let weeklyData = await WeatherService.getOneCall({ lat, lon });
      setWeekly(weeklyData.data.daily);
      setIsloading(false);
    }
    fetchWeather();
  }, [lat, lon]);

  let Components;

  if (!isLoading) {
    Components = (
      <Fragment>
        <Current current={current} weekly={weekly} />
        <WeeklyWeather weekly={weekly} />
      </Fragment>
    );
  }

  return (
    <div className="container pt-10 mx-auto">
      <SearchAutocomplete setLat={setLat} setLon={setLon} />
      {Components}
    </div>
  );
};

export default App;
