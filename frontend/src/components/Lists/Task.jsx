import axios from "axios";
import TaskInfo from "../Taskinfo/Taskinfo";
import React, { useContext, useEffect, useState } from "react";
import "./Task.css";
import { funContext } from "../../context/FunProvider";
function Task(props) {
  const [task, setTask] = useState();
  const [sub, setSub] = useState([]);
  const [isDone, setDone] = useState(0);
  const { showInfo, setshowInfo, activeTaskId, setActiveTaskId } = useContext(funContext);

  const getTasks = async () => {
    try {
      /**here i get each task by take the id as props and git it  */
      const response = await axios.get(`/Api/nixpand/tasks/${props.id}`);
      setTask(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [showInfo]);
  //here to get subtask
  const getSubTask = async () => {
    const updateSub = [];
    for (let i = 0; i < task?.subTask.length; i++) {
      if (task?.subTask[i] !== undefined) {
        const response = await axios.get(`/Api/nixpand/subTasks/${task?.subTask[i]}`);
        updateSub.push(response.data.data);
      }
    }
    setSub(updateSub);

    // Count the number of done subtasks
    const doneSubtasksCount = updateSub.filter((sub) => sub.isDone).length;
    setDone(doneSubtasksCount); //here to get the number of the done task
  };

  //to get the info about the task if you click on it
  const handleClick = () => {
    setshowInfo(true);
    setActiveTaskId(props.id);
  };
  useEffect(() => {
    getSubTask();
  }, [task, showInfo, props.gitList]);

  return (
    <>
      <div className="taskContainer" onClick={handleClick}>
        <h1>{task?.title}</h1>
        <p>
          {isDone} of {sub.length} subtasks
        </p>
      </div>
      {/* here show info set to true and this is for the task i want  the pop message apper */}
      {showInfo && activeTaskId === props.id && (
        <TaskInfo id={task?._id} sub={sub} isDone={isDone} lists={props.lists} getList={props.gitList} />
      )}
    </>
  );
}

export default Task;
