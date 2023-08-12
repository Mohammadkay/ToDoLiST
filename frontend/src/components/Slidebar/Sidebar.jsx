import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Slidebar.css";
import { funContext } from "../../context/FunProvider";
import axios from "axios";
import Swal from "sweetalert2";

function Sidebar() {
  const { toggle, darkMode, setshowInfo } = useContext(funContext);
  const [boards, setBoards] = useState();
  const params = useParams();
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
  const addboard = () => {
    Swal.fire({
      title: "Add your Board Name",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        return await axios.post(`/Api/nixpand/Board`, { boardName: login });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(() => {
      getBoards();
    });
  };
  return (
    <section
      className="Sidebar"
      onClick={() => {
        setshowInfo(false);
      }}
    >
      <nav>
        <li>
          <Link to="/" className="">
            ALL BOARD ({boards?.length})
          </Link>
        </li>
        <ul>
          {boards?.map((board) => {
            return (
              <li key={board._id}>
                <Link to={`/${board?._id}`} className={params.id == board?._id && "Active"}>
                  <span>
                    <i className="fa-solid fa-table-list" style={{ color: "#ffffff" }}></i>
                  </span>
                  {board?.boardName}{" "}
                </Link>
              </li>
            );
          })}

          <li>
            <Link to="/">
              <span>
                <i className="fa-solid fa-table-list" style={{ color: "#ffffff" }}></i>
              </span>
              Marketing Plan
            </Link>
          </li>
          <li></li>
          <li>
            <Link onClick={addboard}>
              <span>
                <i className="fa-solid fa-table-list" style={{ color: "#ffffff" }}></i>
              </span>
              +Create New Board
            </Link>
          </li>
        </ul>
      </nav>

      <section className="visabilty">
        <div className="Mood">
          <div>
            <i className="fa-solid fa-sun fa-xl" style={{ color: "#7a7a7a" }}></i>
          </div>
          <div>
            <label className="switch">
              <input type="checkbox" onChange={toggle} checked={darkMode} />
              <span className="slider round"></span>
            </label>
          </div>

          <div>
            <i className="fa-solid fa-moon fa-xl" style={{ color: "#919191" }}></i>
          </div>
        </div>
        <div className="slideBarDisplay" style={{}}>
          <i className="fa-regular fa-eye-slash" style={{ color: "#919191" }}></i> Hide Sidebar
        </div>
      </section>
    </section>
  );
}

export default Sidebar;
