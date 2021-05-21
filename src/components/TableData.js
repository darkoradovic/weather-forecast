import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { WeatherContext } from "../WeatherContext";
import moment from 'moment'

const TableData = () => {
  const datas = useContext(WeatherContext);

  return (
    <Table striped bordered hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th>{moment().add(1, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(2, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(3, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(4, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(5, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(6, 'days').format('DD MMMM').toString()}</th>
          <th>{moment().add(7, 'days').format('DD MMMM').toString()}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {datas.datas.slice(0,7).map((data) => {
            return(
              <td key={data.temp.day}>
                {data.weather[0].description}
              </td>
            )
          })}
        </tr>
        <tr>
          {datas.datas.slice(0, 7).map((data) => {
            return (
              <td key={data.temp.day} style={{ textAlign: "center" }}>
                { (data.temp.day - 273).toFixed(0)} °C
              </td>
            );
          })}
        </tr>
      </tbody>
    </Table>
  );
};

export default TableData;
