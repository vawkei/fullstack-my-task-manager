import classes from "./Form.module.css";
import Card from "./ui/Card";
import { useState } from "react";

const Form = (props) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [message, setMessage] = useState("");

  const taskChangeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (enteredTask.trim().length === 0) {
      setMessage("Task can't be EMPTY");
      return;
    }

    setEnteredTask("");
    console.log(enteredTask);

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        body: JSON.stringify({task:enteredTask}),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      //return await response.json();

    props.onFetch()

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <Card>
        <p>{message}</p>
        <form className={classes.form} onSubmit={submitHandler}>
          <input type="text" value={enteredTask} onChange={taskChangeHandler} />
          <button>Submit</button>
        </form>
      </Card>
    </div>
  );
};

export default Form;
