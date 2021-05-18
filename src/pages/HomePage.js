import axios from "axios";
import React, { useState } from "react";
import { Row, Col, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CardHome from "../components/CardHome";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);

  const API = "baa188ec83f89bf8f7c82e429dbef294";

  const handleSearch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      )
      .then((res) => {
        setResults(res.data);
        console.log(res.data.name);
      });
      setCity("")
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Row>
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
        {results ? <CardHome name={results.name} /> : null}
    </Row>
  );
};

export default HomePage;
