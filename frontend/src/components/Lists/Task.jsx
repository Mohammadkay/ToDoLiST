import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Task.css";
function Task(props) {
    
  const [task, setTask] = useState();
  const [sub, setSub] = useState([]);
  const [isDone, setDone] = useState(0);

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
  }, []);

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

  useEffect(() => {
    getSubTask();
  }, [task]);
    

  return (
    <div className="taskContainer">
      <h1>{task?.title}</h1>
      <p>
        {isDone} of {sub.length} subtasks
      </p>
    </div>
  );
}

export default Task;
