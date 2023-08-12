import React, { useContext, useState, useEffect, useRef } from "react";
import { funContext } from "../../context/FunProvider";
import axios from "axios";
import "./Task.css";

function Taskinfo(props) {
  const { setshowInfo } = useContext(funContext);
  const [task, setTask] = useState();
  const [sub, setSub] = useState([]);
  const listRef = useRef();
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(`/Api/nixpand/tasks/${props.id}`);
        setTask(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, [props.id]);

  const handelIsDone = async (id, isDone) => {
    try {
      await axios.patch(`/Api/nixpand/subTasks/${id}`, {
        isDone: !isDone
      });
      setSub((prevSub) => {
        return prevSub.map((subTask) => {
          if (subTask._id === id) {
            return { ...subTask, isDone: !isDone };
          }
          return subTask;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (task) {
      const getSubTask = async () => {
        const updateSub = [];
        for (let i = 0; i < task?.subTask.length; i++) {
          if (task?.subTask[i] !== undefined) {
            const response = await axios.get(`/Api/nixpand/subTasks/${task?.subTask[i]}`);
            updateSub.push(response.data.data);
          }
        }
        setSub(updateSub);
      };

      getSubTask();
    }
  }, [task]);

  /***save */
  const handelSubmit = async () => {
    try {
      //here i get the preves list for the task
      const prevlist = props.lists.find((ele) => ele.tasks && ele.tasks.find((e) => e === task._id));
      //here i get the new list from the  id in useref
      const x = props.lists.find((ele) => ele._id === listRef.current.value);
      //here i add the task to the newl ist
      await axios.patch(`/Api/nixpand/lists/${x._id}`, {
        tasks: [...x.tasks, task._id]
      });
      //here i drop it from the old one
      const filters = prevlist.tasks.filter((ele) => ele.toString() !== task._id.toString());
      await axios.patch(`/Api/nixpand/lists/${prevlist._id}`, {
        tasks: filters
      });
      setshowInfo(false);
    } catch (error) {
      console.log(error);
    }
    props.getList();
  };

  return (
    <>
      <section className="info_container">
        <div>
          <h1>{task?.title}</h1>
        </div>
        <div>
          <p>{task?.description}</p>
        </div>

        <section className="sub_task_cheacks">
          <h3>
            {sub.filter((subTask) => subTask.isDone).length} of {sub.length} subtasks
          </h3>

          {sub.length > 0 &&
            sub.map((ele) => (
              <div className="cheackSub" key={ele._id}>
                <div>
                  <input type="checkbox" checked={ele.isDone} onChange={() => handelIsDone(ele._id, ele.isDone)} />
                </div>
                <p>{ele.subTaskName}</p>
              </div>
            ))}
        </section>
        <section className="statusinfo">
          <h3>status</h3>
          <select ref={listRef}>
            {props.lists.map((item) => {
              return <option value={item._id}>{item.title}</option>;
            })}
          </select>
        </section>
        <div>
          <button onClick={handelSubmit}>Save</button>
        </div>
      </section>
      <div className="hidepop" onClick={handelSubmit}></div>
    </>
  );
}

export default Taskinfo;
