import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { WeatherContext } from "../WeatherContext";
import moment from "moment";

const LineChart = () => {
  const datas = useContext(WeatherContext);

  const info = datas.datas.map((data) => (data.temp.day - 273).toFixed(0));

  const data = {
    labels: [
      moment().add(1, "days").format("DD MMMM").toString(),
      moment().add(2, "days").format("DD MMMM").toString(),
      moment().add(3, "days").format("DD MMMM").toString(),
      moment().add(4, "days").format("DD MMMM").toString(),
      moment().add(5, "days").format("DD MMMM").toString(),
      moment().add(6, "days").format("DD MMMM").toString(),
      moment().add(7, "days").format("DD MMMM").toString(),
    ],
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
