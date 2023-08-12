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
      const response = await axios.get(`/Api/nixpand/tasks/${props.id}`);
      setTask(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [showInfo]);

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
    setDone(doneSubtasksCount);
  };
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
      {showInfo && activeTaskId === props.id && (
        <TaskInfo id={task?._id} sub={sub} isDone={isDone} lists={props.lists} getList={props.gitList} />
      )}
    </>
  );
}

export default Task;
