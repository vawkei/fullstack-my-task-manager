import Form from "./components/Form";
import Tasks from "../src/components/Tasks";
import { useEffect, useState } from "react";
import EditTask from "./components/EditTask";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "GET",
        body: JSON.stringify(),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      const data = await response.json();
      //console.log(data.task);

      const arrayedData = data.task;
      const loadedTask = [];

      // for(const taskKey in arrayedData){
      //   loadedTask.push({id:taskKey, task :arrayedData[taskKey].task})
      // };
      for (const taskData of arrayedData) {
        // Assuming taskData has an _id property, which is a valid MongoDB ObjectId
        loadedTask.push({ _id: taskData._id, task: taskData.task });
      }

      setTasks(loadedTask);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  //  const addTaskHandler = (task)=>{
  //   setTasks((previousTasks)=>{
  //     return[...previousTasks,task]
  //   })
  //  };not needed, since i am passing the fetchTask() function to the Task component

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Form onFetch={fetchTasks}  />
              <Tasks isLoading={isLoading} tasks={tasks} />
            </div>
          }
        />

        <Route path="/:id" element={<EditTask onFetch={fetchTasks} tasks={tasks}/>} />
      </Routes>
    </div>
  );
}

export default App;
