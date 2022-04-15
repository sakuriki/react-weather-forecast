import React, { useState, useCallback } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import debounce from 'lodash/debounce';
import WeatherService from '../services/WeatherService';

export const SearchAutocomplete = ({
  setLat,
  setLon,
}: {
  setLat: any;
  setLon: any;
}) => {
  const [city, setCity] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<any>>([]);
  const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

  const getData = (value: string) => {
    if (value !== '') {
      WeatherService.getGeocoding({ q: value })
        .then((res: any) => {
          setSuggestions(res.data);
          setShowSuggestion(true);
        })
        .catch((err: Error) => {
          console.error(err);
        });
    }
  };

  const debounceGetData = useCallback(
    debounce((value: string) => getData(value), 200),
    [],
  );

  const handleCityOnChange = (event: any) => {
    const { value } = event.target;
    setCity(value);
    debounceGetData(value);
  };
  const handleOnClick = (event: any) => {
    const { dataset } = event.target;
    const cityData = suggestions[dataset.index];
    setCity(cityData.name);
    setSuggestions([]);
    setShowSuggestion(false);
    setLat(cityData.lat);
    setLon(cityData.lon);
  };

  const renderSuggestions = () => {
    let suggestionsListComponent;

    if (city && showSuggestion) {
      if (suggestions.length) {
        suggestionsListComponent = (
          <ul className="bg-white border border-gray-100 w-full mt-2">
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  onClick={handleOnClick}
                  data-index={index}
                  className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                >
                  <svg
                    className="absolute w-4 h-4 left-2 top-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {suggestion.name}
                  {suggestion.state ? ', ' + suggestion.state : ''}(
                  {suggestion.country})
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <ul className="bg-white border border-gray-100 w-full mt-2">
            <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
              <svg
                className="absolute w-4 h-4 left-2 top-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              No matching.
            </li>
          </ul>
        );
      }
    }
    return suggestionsListComponent;
  };

  return (
    <div className="mx-auto">
      <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="relative">
          <input
            type="text"
            className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
            placeholder="city name..."
            value={city}
            onChange={handleCityOnChange}
          />
          <svg
            className="w-4 h-4 absolute left-2.5 top-3.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {renderSuggestions()}
      </div>
    </div>
  );
};
