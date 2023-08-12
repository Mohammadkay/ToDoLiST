import React from "react";
import MarketPlan from "../components/MarketPlan/MarketPlan";
import Sidebar from "../components/Slidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
function Markets() {
  return (
    <>
      {" "}
      <div className="container">
        <Sidebar />

        <div style={{ width: "80%" }}>
          <Navbar />
          <MarketPlan />
        </div>
      </div>
    </>
  );
}

export default Markets;
