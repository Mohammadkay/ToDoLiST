import React, { useState, useEffect } from "react";
import ListsCharts from "./ListsChart/ListsCharts";
import axios from "axios";
import "./Market.css";
function MarketPlan() {
  const [boards, setBoards] = useState();
  const getBoards = async () => {
    try {
      const response = await axios.get("/Api/nixpand/Board");
      await setBoards(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // Call the async function
    getBoards();
  }, []);
  return (
    <div className="charts_container ">
      {boards?.map((ele) => {
        return (
          <div style={{ paddingTop: "10px" }}>
            <h1 style={{ textAlign: "center" }}>{ele.boardName}</h1>
            <ListsCharts listsId={ele.lists} />
          </div>
        );
      })}
    </div>
  );
}

export default MarketPlan;
