import React, { useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [results, setResults] = useState(null);
  const [datas, setData] = useState(null);

  console.log(results);
  console.log(datas);
  

  return (
    <WeatherContext.Provider value={{ results, setResults, datas, setData }}>
      {props.children}
    </WeatherContext.Provider>
  );
};
