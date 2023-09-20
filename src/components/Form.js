import classes from "./Form.module.css";
import Card from "./ui/Card";
import { useState } from "react";
import Tasks from "./Tasks";

const Form = () => {
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");

  const taskChangeHandler = (e) => {
    setTask(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (task.trim().length === 0) {
      setMessage("Task can't be EMPTY");
      return;
    }

    console.log(task);
    setTask("");
  };

  return (
    <div>
      <Card>
        <p>{message}</p> 
        <form className={classes.form} onSubmit={submitHandler}>
          <input type="text" value={task} onChange={taskChangeHandler} />
          <button>Submit</button>
        </form>
      </Card>
      <Card className={classes.card}>
        <Tasks task={task} />
      </Card>
    </div>
  );
};

export default Form;
