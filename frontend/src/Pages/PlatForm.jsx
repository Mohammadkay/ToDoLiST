import React, { useState } from "react";
import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./Platform.css";
import Lists from "../components/Lists/Lists";
import AddTaskPop from "../components/AddTaskPop/AddTaskPop";
function platform() {
  return (
    <>
      {" "}
      <div className="container">
        <Sidebar />

        <div style={{ width: "80%" }}>
          <Navbar add={true} />
          <Lists />
        </div>
      </div>
      <AddTaskPop />
    </>
  );
}

export default platform;
