import axios from "axios";
import moment from "moment";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CardHome from "../components/CardHome";
import { WeatherContext } from "../WeatherContext";
import { Link } from "react-router-dom";

const HomePage = ({ history }) => {
  const [city, setCity] = useState("");
  const { setResults } = useContext(WeatherContext);
  const [active, setActive] = useState(true);
  const [error, setError] = useState(false);
  const cities = JSON.parse(localStorage.getItem("allEntries"));

  const API_KEY = "baa188ec83f89bf8f7c82e429dbef294";

  const handleSearch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        if (res.data.cod === 200) {
          setResults(res.data);
          console.log(res.data);
          history.push(`/city/${city}`);
          addEntry();
        } else if (res.data.cod !== 200) {
          history.push("/error");
        }
      })
      .catch(() => {
        setError(true);
        history.push("/error");
      });
    setCity("");
    //checkError()
    /* if(!error){
      setTimeout(() => {
        history.push("/city");
      }, 1000);
  
      addEntry();
    } */
  };

  const addEntry = () => {
    // Parse any JSON previously stored in allEntries
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
    if (existingEntries == null) existingEntries = [];
    var entryTitle = city;
    var entry = {
      name: entryTitle,
      time: moment().format("DD-MM-YYYY"),
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  const toggleActive = () => {
    setActive((active) => !active);
  };

  const handleName = (name) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      )
      .then((res) => {
        if (res.data.cod === 200) {
          setResults(res.data);
          console.log(res.data);
          history.push(`/city/${name}`);
        } else if (res.data.cod !== 200) {
          history.push("/error");
        }
      })
      .catch(() => {
        setError(true);
        history.push("/error");
      });

  };

  return (
    <Row>
      {error}
      <Col xs={12} lg={12} md={12} className="text-center">
        <div className="input-container">
          <div className="icon">
            <FaSearch onClick={handleSearch} />
          </div>
          <input
            className="input-field"
            type="text"
            placeholder="Enter the city name to get the weather forecast"
            onChange={(event) => setCity(event.target.value)}
            value={city}
            onKeyDown={onKeyDown}
          />
        </div>
      </Col>
      <div
        style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}
      >
        <label className="switchHome">
          <input type="checkbox" onClick={() => toggleActive()} />
          <span className="sliderHome"></span>
        </label>
      </div>
      {!active && cities
        ? cities
            .reverse()
            .slice(0, 9)
            .map((tab) => {
              return (
              <Col lg={3} md={4} sm={6} xs={12} className='cities-cards'  onClick={() => handleName(tab.name)}>
              <CardHome name={tab.name} time={tab.time} />
              </Col>
              )
            })
        : null}
      {/*  {results ? <CardHome name={results.name} temp={results.main.temp} /> : null} */}
    </Row>
  );
};

export default withRouter(HomePage);
