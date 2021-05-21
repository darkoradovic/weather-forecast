import React, { useState, createContext } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = (props) => {
  const [results, setResults] = useState(null);
  const [datas, setDatas] = useState([]);
  const [desc, setDesc] = useState(null);
  const [icon, setIcon] = useState(null)
  const [loading, setLoading] = useState(false);

  console.log(desc);

  return (
    <WeatherContext.Provider
      value={{ results, setResults, datas, setDatas, loading, setLoading, desc, setDesc, icon, setIcon }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};
