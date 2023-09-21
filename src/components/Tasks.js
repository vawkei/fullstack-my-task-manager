import classes from "./Tasks.module.css";
import Card from "./ui/Card";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const Tasks = (props) => {
  const tasks = props.tasks;
  //console.log(typeof tasks ) this shouldn't be an object i think it ought to be an array of objets;

  return (
    <div className={classes.container}>
      {tasks.length === 0 ? (
        <p>No tasks Found</p>
      ) : (
        <>
          <h2>Tasks</h2>
          <ul>
            {tasks.map((task) => {
              return (
                <div key={task.id}>
                  <Card className={classes.card}>
                    <li>{task.task}</li>
                    <div className={classes.icons}>
                      <AiFillEdit />
                      <BsTrash />
                    </div>
                  </Card>
                </div>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default Tasks;
