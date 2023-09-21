import Form from "./components/Form";
import Tasks from "../src/components/Tasks";
import { useEffect, useState } from "react";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks,setTasks] = useState([])

  useEffect(()=>{
    fetchTasks()
  },[]);

  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/tasks",{
        method:"GET",
        body:JSON.stringify(),
        headers: {"Content-Type":"application/json"}
      });
      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      const data = await response.json();
      console.log(data.task)
      
      const arrayedData = data.task
      const loadedTask = [];

      for(const taskKey in arrayedData){
        loadedTask.push({id:taskKey, task :arrayedData[taskKey].task})
      };
      setTasks(loadedTask);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  
  
 const addTaskHandler = (task)=>{
  setTasks((previousTasks)=>{
    return[...previousTasks,task]
  })
 };

 
  return (
    <div>
      <Form onAddTask={addTaskHandler} />
      <Tasks isLoading={isLoading} tasks={tasks} />
    </div>
  );
}

export default App;
