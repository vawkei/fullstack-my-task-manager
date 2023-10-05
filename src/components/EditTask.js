import { useParams,useNavigate } from "react-router-dom";
import classes from "./EditTask.module.css";
import Card from "./ui/Card";
import { useState,useEffect } from "react";


const EditTask = (props) => {
  const { id } = useParams();
  
  const [enteredTask, setEnteredTask] = useState("");

  const enteredTaskChangeHandler = (e) => {
    setEnteredTask(e.target.value);
  };

  const navigate =  useNavigate();


//use useEffect to get the entered name from the GET request:
useEffect(()=>{
  getInputData()
},[])
//the function to write the GET request:

const getInputData =async ()=>{
  try{
    const response = await fetch(`http://localhost:8000/api/tasks/${id}`);
    const data = await response.json();
    console.log(data.task.task);
    setEnteredTask(data.task.task)
    if(!response.ok){
      throw new Error("Something went wrong")
    }
  }catch(error){
    console.log(error)
  }
};

  const editFunc = async () => {
      
    try{
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({_id:id,task:enteredTask}),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    console.log(data);
    navigate("/")
    props.onFetch()
    }catch(error){
      console.log(error)
    }
    
  };

  return (
    <Card className={classes.card}>
      <h2>Edit Task</h2>
      <form onSubmit={(e)=>{
        e.preventDefault()
        editFunc(id)
      }}>
        <div className={classes.control}>
          <label htmlFor="">TaskID</label>
          <input value={id} style={{ border: "none", outline: "none" }} disabled />
        </div>
        <div className={classes.control}>
          <label htmlFor="">Task</label>
          <input
            id="task"
            type="text"
            value={enteredTask}
            onChange={enteredTaskChangeHandler}
          />
        </div>
        {/* <div className={classes.control}>
          <label htmlFor="">Completed</label>
          <input type="checkbox" />
        </div> */}
        <div className={classes.action}>
          <button>Edit</button>
        </div>
      </form>
    </Card>
  );
};

export default EditTask;


// console.log(id);
  //  const tasks = props.tasks;
  //console.log(tasks);



  // let thisTask = tasks.filter((task) => {
  //   return task._id === id;
  // });
  // //console.log(thisTask)
  
  // const singleTask = thisTask[0]
  // //console.log(singleTask)
