import axios from "axios";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as chartjs } from "chart.js/auto";
function ListsCharts(props) {
  const [labels, setLabels] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getLabel = async () => {
    try {
      const labelData = await Promise.all(
        props.listsId.map(async (ele) => {
          const response = await axios.get(`/Api/nixpand/lists/${ele}`);
          return response.data.data;
        })
      );

      const title = labelData.map((ele) => ele.title);
      const tasksArray = labelData.map((ele) => ele.tasks);

      setLabels(title);
      setTasks(tasksArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLabel();
  }, []);

  // Calculate the number of tasks in each list
  const tasksCount = tasks.map((listTasks) => listTasks.length);
  console.log(tasksCount);
  // Chart data and options
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Number of Tasks",
        data: tasksCount,
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  return (
    <div style={{ width: "450px" }}>
      <Bar data={data} />
    </div>
  );
}

export default ListsCharts;
