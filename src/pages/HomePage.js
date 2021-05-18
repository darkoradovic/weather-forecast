import axios from "axios";
import React, { useState, useContext } from "react";
import { withRouter } from "react-router";
import { Row, Col} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import CardHome from "../components/CardHome";
import { WeatherContext } from "../WeatherContext";

const HomePage = ({history}) => {

  const [city, setCity] = useState('')
  const {setResults} = useContext(WeatherContext)
  

  const API_KEY = "baa188ec83f89bf8f7c82e429dbef294";

  const handleSearch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      });
      setCity("");
      setTimeout(() => {
       history.push('/city')
      }, 1000);
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
       {/*  {results ? <CardHome name={results.name} temp={results.main.temp} /> : null} */}
    </Row>
  );
};

export default withRouter(HomePage);
