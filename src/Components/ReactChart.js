import React, { PureComponent } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default class Example extends PureComponent {
  // there is no post data in api, so I scape it
  state = {
    data: [
      {
        month: "Jan",
        post: 400,
      },
      {
        month: "Feb",
        post: 320,
      },
      {
        month: "Mar",
        post: 200,
      },
      {
        month: "Apr",
        post: 200,
      },
      {
        month: "May",
        post: 100,
      },
      {
        month: "Jun",
        post: 800,
      },
      {
        month: "Jul",
        post: 470,
      },
      {
        month: "Aug",
        post: 260,
      },
      {
        month: "Sep",
        post: 633,
      },
      {
        month: "Oct",
        post: 230,
      },
      {
        month: "Nov",
        post: 80,
      },
      {
        month: "Dec",
        post: 729,
      },
    ],
    activeIndex: 0,
  };

  handleClick = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { activeIndex, data } = this.state;
    const activeItem = data[activeIndex];

    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={150} height={80} data={data}>
            <Bar dataKey="post" onClick={this.handleClick}>
              {data.map((entry, index) => (
                <Cell
                  cursor="pointer"
                  fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
                  key={`cell-${index}`}
                />
              ))}
            </Bar>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
          </BarChart>
        </ResponsiveContainer>
        <p className="content">{`post in "${activeItem.month}": ${activeItem.post}`}</p>
      </div>
    );
  }
}
