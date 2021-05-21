import React from "react";
import { Card } from "react-bootstrap";

const CardHome = ({ name, time }) => {
  return (
    <Card style={{ margin: "20px 10px", display: "flex", flexWrap: "wrap" }}>
      <Card.Body>
        <Card.Title>{name.charAt(0).toUpperCase() + name.slice(1)}</Card.Title>
        <Card.Text>Checked on: {time}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardHome;
