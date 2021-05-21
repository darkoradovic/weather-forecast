import React, { useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [results, setResults] = useState(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log(results);

  return (
    <WeatherContext.Provider
      value={{ results, setResults, datas, setDatas, loading, setLoading }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
