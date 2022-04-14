import React, { useState } from 'react';
import { WeeklyWeather } from './components/Weekly';
import { SearchAutocomplete } from './components/SearchAutocomplete';
import { Current } from './components/Current';

const App = () => {
  const [lat, setLat] = useState<number>(21.0398439);
  const [lon, setLon] = useState<number>(105.7899318);
  const [today, setToday] = useState<Object>({});

  return (
    <div className="container pt-10 mx-auto">
      <SearchAutocomplete setLat={setLat} setLon={setLon} />
      <Current lat={lat} lon={lon} today={today} />
      <WeeklyWeather lat={lat} lon={lon} setToday={setToday} />
    </div>
  );
};

export default App;
