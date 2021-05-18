import React, { useContext } from "react";
import {Card} from 'react-bootstrap'
import { WeatherContext } from "../WeatherContext";

const CardHome = ({name, temp}) => {

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          {temp}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardHome;
