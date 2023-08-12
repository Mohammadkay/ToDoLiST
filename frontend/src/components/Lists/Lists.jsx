import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./List.css";
import Task from "./Task";
import { funContext } from "../../context/FunProvider";
function Lists() {
  const { setPop, pop } = useContext(funContext);
  const [lists, setLists] = useState([]);
  const [board, setBoard] = useState([]);

  const parms = useParams();
  console.log("parms.id:", parms.id); // Check the value of parms.id

  const getBoards = async () => {
    try {
      const response = await axios.get(`/Api/nixpand/Board/${parms.id}`);
      setBoard(response.data.data.lists);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getBoards();
  }, [parms.id]);

  const getList = async () => {
    try {
      const updatedLists = [];

      for (const item of board) {
        const lis = await axios.get(`/Api/nixpand/lists/${item}`);
        updatedLists.push(lis.data.data);
      }

      setLists(updatedLists);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, [board, pop]);

  const addnewColumn = async () => {
    try {
      Swal.fire({
        title: "Add your Board Name",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        preConfirm: async (list) => {
          const response = await axios.post(`/Api/nixpand/lists`, { title: list });
          const updatedLists = await [...lists, response.data.data._id];

          await axios.patch(`/Api/nixpand/Board/${parms.id}`, {
            lists: updatedLists
          });
          setLists((prevLists) => [...prevLists, response.data.data]);
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section
      className="listContainer"
      onClick={() => {
        setPop(false);
      }}
    >
      {lists?.map((list) => (
        <div key={list?._id} className="lists">
          <div className="listHeader">
            <div
              style={{
                backgroundColor: `${list?.color}`,
                width: "10px",
                height: "10px",
                borderRadius: "50%"
              }}
            ></div>
            <div> {list?.title}</div>
            <div>( {list?.tasks.length} )</div>
          </div>
          {list?.tasks.map((task) => {
            return (
              <div>
                <Task id={task} />
              </div>
            );
          })}
        </div>
      ))}
      <div className="addList" onClick={addnewColumn}>
        + New Column
      </div>
    </section>
  );
}

export default Lists;
