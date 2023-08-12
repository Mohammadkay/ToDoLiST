import React, { useContext, useRef, useState, useEffect } from "react";
import { funContext } from "../../context/FunProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./pop.css";
function AddTaskPop() {
  const { pop, setPop } = useContext(funContext);

  const [subtasks, setSubtasks] = useState([]);
  const [lists, setLists] = useState([]);
  const [board, setBoard] = useState([]);
  const titleRef = useRef();
  const descrptionRef = useRef();
  const statusRef = useRef();
  const subtaskRefs = useRef([]);
  const parms = useParams();

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

  /******* */
  const addSubtask = (e) => {
    e.preventDefault();
    const newSubtaskRefs = subtaskRefs.current.slice();
    newSubtaskRefs.push(React.createRef());
    subtaskRefs.current = newSubtaskRefs;

    setSubtasks((prevSubtasks) => [...prevSubtasks, ""]);
  };

  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };
  const handelSlice = async (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(statusRef.current.value);
    try {
      const subtaskPromises = await subtaskRefs.current.map(async (ref) => {
        const response = await axios.post("/Api/nixpand/subTasks/", { subTaskName: ref.current.value });
        return response.data.data._id;
      });

      const subtaskIds = await Promise.all(subtaskPromises);
      console.log(subtaskIds);

      const response = await axios.post("/Api/nixpand/tasks", {
        title: titleRef.current.value,
        description: descrptionRef.current.value,
        subTask: subtaskIds
      });
      await axios.patch(`/Api/nixpand/lists/${statusRef.current.value}`, {
        tasks: [...lists.find((list) => list._id === statusRef.current.value).tasks, response.data.data._id]
      });
      setLists((prevLists) => [...prevLists, response.data.data]);
      setPop(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    pop && (
      <section className="addPopContainer">
        <h1>Add new Task</h1>
        <form className="formTask" onSubmit={handleSubmit}>
          <div className="taskFormsInput">
            <label htmlFor="taskTitle">Title</label>
            <input ref={titleRef} type="text" id="taskTitle" />
          </div>
          <div className="taskFormsInput">
            <label htmlFor="taskDescription">Description</label>
            <textarea ref={descrptionRef} id="taskDescription" rows="4" cols="50"></textarea>
          </div>
          <div className=" subtaskInput">
            <label htmlFor="taskTitle">Subtasks</label>
            {subtasks.map((subtask, index) => (
              <div>
                <input
                  key={index}
                  ref={subtaskRefs.current[index]}
                  value={subtask}
                  onChange={(e) => handleSubtaskChange(index, e.target.value)}
                  placeholder={`Subtask ${index + 1}`}
                />
                <i onClick={() => handelSlice(index)} className="fa-solid fa-x" style={{ color: "#7b8093" }}></i>
              </div>
            ))}

            <button onClick={addSubtask}>Add Subtask</button>
          </div>
          <div className="taskFormsInput">
            <label htmlFor="status">status</label>
            <select id="status" ref={statusRef}>
              {lists.map((list) => {
                return <option value={list._id}>{list.title}</option>;
              })}
            </select>
          </div>
          <button className="addTaskButton">create Task</button>
        </form>
      </section>
    )
  );
}

export default AddTaskPop;
