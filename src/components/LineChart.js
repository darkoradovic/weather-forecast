import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { WeatherContext } from "../WeatherContext";

const LineChart = () => {

  const datas = useContext(WeatherContext)

  console.log(datas.datas.daily)

  const info = datas.datas.daily.map(days => {
    return (days.temp.day - 273).toFixed(2);
  })
  
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6","Day 7"],
    datasets: [
      {
        label: "Temp: ",
        data: info,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)"
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
      <div className="header">
        <h4 className="title">Forecast for the next 7 days</h4>
        <button>SWITCH</button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;

