import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import CityPage from "./pages/CityPage";
import HomePage from "./pages/HomePage";
import { WeatherProvider } from "./WeatherContext";

const App = () => {
  return (
    <WeatherProvider>
      <Container className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/city" component={CityPage} />
        </Switch>
      </Container>
    </WeatherProvider>
  );
};

export default App;
