import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardHome from "../components/CardHome";
import LineChart from "../components/LineChart";
import TableData from "../components/TableData";
import { WeatherContext } from "../WeatherContext";

const CityPage = ({ history }) => {
  const { setDatas } = useContext(WeatherContext);
  const { setDesc } = useContext(WeatherContext);
  const { setIcon } = useContext(WeatherContext);
  const results = useContext(WeatherContext);
  const { setResults } = useContext(WeatherContext);
  const { setLoading } = useContext(WeatherContext);
  const [active, setActive] = useState(true);
  const [toggle, setToggle] = useState(true);
  const cities = JSON.parse(localStorage.getItem("allEntries"));
  const [error, setError] = useState(false);

  //console.log(results);

  const API_KEY = "baa188ec83f89bf8f7c82e429dbef294";
  const lat = results.results.coord.lat;
  const lon = results.results.coord.lon;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((result) => {
          setDatas(result.daily);
        })
        .catch(() => console.log("Error"));

      setLoading(false);
    };

    fetchData();
  }, [lat, lon]);

  const handleName = (name) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      )
      .then((res) => {
        if (res.data.cod === 200) {
          setResults(res.data);
          //console.log(res.data);
          history.push(`/city/${name}`);
        } else if (res.data.cod !== 200) {
          history.push("/error");
        }
      })
      .catch(() => {
        setError(true);
        history.push("/error");
      });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleActive = () => {
    setActive((active) => !active);
  };

  const toggleLastThree = () => {
    setToggle((toggle) => !toggle);
  };

  const conversionC = results.results.main.temp - 273;
  return (
    <Container>
      <Row style={{ textAlign: "left" }}>
        <Col>
          <h1>
            {results.results.name}, {results.results.sys.country}
          </h1>
          <p>Date: {moment().format("DD-MM-YYYY")}</p>
          <p>Time: {moment().format("HH:mm")}</p>
        </Col>
        <Col lg={6}></Col>
        <Col>
          <h5>Current weather details: </h5>
          <p>Temperature: {conversionC.toFixed(0)} °C</p>
          <p>Wind: {results.results.wind.speed} Km/h</p>
          <p>Humidity: {results.results.main.humidity} %</p>
        </Col>
      </Row>
      <Row lg={12}>
        <div className="header">
          <h4 className="title">Forecast for the next 7 days</h4>
          <label className="switch">
            <input type="checkbox" onClick={() => toggleActive()} />
            <span className="slider"></span>
          </label>
        </div>
        {active && <LineChart />}
        {!active && <TableData />}
      </Row>
      <Link to="/">
        <Button lg={4} style={{ margin: "50px 0", width: "250px" }}>
          GO TO HOME PAGE
        </Button>
      </Link>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "100px",
        }}
      >
        <label className="switchHome">
          <input type="checkbox" onClick={() => toggleLastThree()} />
          <span className="sliderHome"></span>
        </label>
      </div>
      <Row>
        {!toggle && cities
          ? cities
              .reverse()
              .slice(0, 3)
              .map((tab) => {
                return (
                  <Col
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    className="cities-cards"
                    onClick={() => handleName(tab.name)}
                  >
                    <CardHome name={tab.name} time={tab.time} />
                  </Col>
                );
              })
          : null}
      </Row>
    </Container>
  );
};

export default CityPage;
