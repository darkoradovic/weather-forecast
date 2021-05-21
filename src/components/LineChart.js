import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { WeatherContext } from "../WeatherContext";

const LineChart = () => {
  const datas = useContext(WeatherContext);

  const info = datas.datas.map((data) => (data.temp.day - 273).toFixed(0));

  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Temp: ",
        data: info,
        fill: false,
        backgroundColor: "rgb(11, 94, 215)",
        borderColor: "rgb(11, 94, 215)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
