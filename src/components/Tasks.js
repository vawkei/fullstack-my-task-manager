import { Fragment, useState } from "react";
import classes from "./Tasks.module.css";
import Card from "./ui/Card";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const Tasks = (props) => {
  const tasks = props.tasks;
  console.log(tasks);
  //console.log(typeof tasks ) this shouldn't be an object i think it ought to be an array of objets;

  const [hiddenTasks, setHiddenTasks] = useState([]);

  // const onClickHandler = (e) => {
  //   e.target.style.textDecoration = "line-through";
  // };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }
      setHiddenTasks([...hiddenTasks, id]);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      {tasks.length === 0 ? (
        <p>No tasks Found</p>
      ) : (
        <Fragment>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task) => {
              return (
                <div key={task._id}>
                  {!hiddenTasks.includes(task._id) ? (
                    <Card className={classes.card}>
                      <li>{task.task}</li>
                      <div className={classes.icons}>
                        <Link to={`/${task._id}`}>
                          <div>
                            <AiFillEdit />
                          </div>
                        </Link>
                        <BsTrash onClick={() => deleteTask(task._id)} />
                      </div>
                    </Card>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

export default Tasks;
