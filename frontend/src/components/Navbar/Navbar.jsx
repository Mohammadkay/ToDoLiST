import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import { funContext } from "../../context/FunProvider";
function Navbar(props) {
  const { setPop, pop, setshowInfo } = useContext(funContext);
  const pophandel = () => {
    setPop(true);
  };

  return (
    <nav
      className="navbarNav"
      onClick={() => {
        setshowInfo(false);
      }}
    >
      <h1>Platform Launch</h1>
      {props.add && (
        <section className="nav_btn">
          <button onClick={pophandel} className=".active">
            +Add New Task
          </button>
          <i className="fa-solid fa-ellipsis-vertical fa-2xl" style={{ color: "#919191" }}></i>
        </section>
      )}
    </nav>
  );
}

export default Navbar;
