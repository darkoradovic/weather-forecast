import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { WeatherContext } from "../WeatherContext";

const TableData = () => {
  const datas = useContext(WeatherContext);

  return (
    <Table striped bordered hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th>Day 1</th>
          <th>Day 2</th>
          <th>Day 3</th>
          <th>Day 4</th>
          <th>Day 5</th>
          <th>Day 6</th>
          <th>Day 7</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {datas.datas.slice(0, 7).map((data) => {
            return (
              <td key={data.temp.day} style={{ textAlign: "center" }}>
                {(data.temp.day - 273).toFixed(0)} °C
              </td>
            );
          })}
        </tr>
      </tbody>
    </Table>
  );
};

export default TableData;
