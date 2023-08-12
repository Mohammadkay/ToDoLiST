import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { funContext } from "../../context/FunProvider";
function Navbar() {
  const { setPop, pop } = useContext(funContext);
  const pophandel = () => {
    setPop(true);
    console.log(pop);
  };
  
  return (
    <nav className="navbarNav">
      <h1>Platform Launch</h1>
      <section className="nav_btn">
        <button onClick={pophandel} className=".active">
          +Add New Task
        </button>
        <i className="fa-solid fa-ellipsis-vertical fa-2xl" style={{ color: "#919191" }}></i>
      </section>
    </nav>
  );
}

export default Navbar;
