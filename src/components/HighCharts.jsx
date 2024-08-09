import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartsComponent = () => {
  // Dummy data (same as before)
  const barChartData = [
    { name: "John", books: 5 },
    { name: "Emma", books: 3 },
    { name: "Michael", books: 7 },
    { name: "Sophia", books: 2 },
    { name: "William", books: 4 },
  ];

  const pieChartData = [
    { name: "With Books", y: 65 },
    { name: "Without Books", y: 35 },
  ];

  const lineChartData = [
    { month: "Jan", users: 100 },
    { month: "Feb", users: 120 },
    { month: "Mar", users: 140 },
    { month: "Apr", users: 160 },
    { month: "May", users: 180 },
    { month: "Jun", users: 200 },
  ];

  // Chart options (same as before, with small adjustments)
  const barChartOptions = {
    chart: { type: "column", height: "300px" },
    title: { text: "Books Issued per Student" },
    xAxis: { categories: barChartData.map((item) => item.name) },
    yAxis: { title: { text: "Number of Books" } },
    series: [
      {
        name: "Books Issued",
        data: barChartData.map((item) => item.books),
        color: "#FF9933",
      },
    ],
  };

  const pieChartOptions = {
    chart: { type: "pie", height: "300px" },
    title: { text: "Students with vs without Books" },
    series: [
      {
        name: "Students",
        data: pieChartData,
        colors: ["#3366CC", "#DC3912"],
      },
    ],
  };

  const lineChartOptions = {
    chart: { type: "line", height: "300px" },
    title: { text: "Total Users Over Time" },
    xAxis: { categories: lineChartData.map((item) => item.month) },
    yAxis: { title: { text: "Number of Users" } },
    series: [
      {
        name: "Total Users",
        data: lineChartData.map((item) => item.users),
        color: "#109664",
      },
    ],
  };

  return (
    <div className=" flex p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 ">
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartsComponent;
