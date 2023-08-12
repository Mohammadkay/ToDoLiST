import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./List.css";
import Task from "./Task";
import { funContext } from "../../context/FunProvider";
function Lists() {
  const { setPop, pop } = useContext(funContext);

  const [lists, setLists] = useState([]); //for lists inside the board
  const [board, setBoard] = useState([]); //for the board
  const [sort, setSort] = useState(false); //for sorting

  const parms = useParams();
  //get te board to get the list inside it
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
  }, [parms.id]); //to change when go to another board

  const getList = async () => {
    try {
      const updatedLists = [];
      //get all list that in the same board so this for will walk throw the array in the board and then git the lists
      for (const item of board) {
        const lis = await axios.get(`/Api/nixpand/lists/${item}`);
        updatedLists.push(lis.data.data);
      }

      setLists(updatedLists); //save it in the state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, [board, pop, sort]);

  //here i use sweet alert to add new list
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

  const handleSortClick = () => {
    // Toggle the sort state when clicked
    setSort(!sort);
    getList();
  };
  return (
    <section
      className="listContainer"
      onClick={() => {
        setPop(false);
      }}
    >
      {/* here i use map to walk throw the lists and git the list info */}
      {lists?.map((list) => (
        <div key={list?._id} className="lists">
          <div className="listHeader">
            <section className="titleheader">
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
            </section>
            {/* sort section */}
            <div className="sortList">
              <i className="fa-solid fa-sort-up fa-xl" style={{ color: "#ffffff" }} onClick={handleSortClick}></i>
              <i className="fa-solid fa-sort-down fa-xl" style={{ color: "#ffffff" }} onClick={handleSortClick}></i>
            </div>
          </div>
          {/* here to chack if sort give the data sorted else give it to me reverse */}
          {sort
            ? list?.tasks.map((task, index) => (
                <div key={index}>
                  <Task id={task} lists={lists} gitList={getList} />
                </div>
              ))
            : list?.tasks
                .slice()
                .reverse()
                .map((task, index) => (
                  <div key={index}>
                    {/* {go throw another component} */}
                    <Task id={task} lists={lists} gitList={getList} />
                  </div>
                ))}
        </div>
      ))}
      <div className="addList" onClick={addnewColumn}>
        + New Column
      </div>
    </section>
  );
}
export default Lists;
