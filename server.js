const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const mongoose =  require("mongoose");
const getAllTasks = require("./src/backend/routes/tasks");
const getSingleTask = require("./src/backend/routes/tasks");
const createTask = require("./src/backend/routes/tasks");
const updateTask = require("./src/backend/routes/tasks");
const deleteTask = require("./src/backend/routes/tasks");

app.use(cors());
app.use(express.json());

//get all tasks
//get single task
// create task {post}
//update task
//delete task

//get all tasks:
app.use("/api/tasks/",getAllTasks );

//get single task:
app.get("/api/tasks/:id",getSingleTask);

// create task {post}:
app.post("/api/tasks",createTask);

//update task:
app.put("/api/tasks/:id",updateTask);

//delete task:
app.delete("/api/tasks/:id",deleteTask)

const start =async ()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(8000, "localhost", () => {
      console.log("it's on");
      console.log("Server is listening on port 8000");
    })    
  }
  catch(error){
    console.log(error)
  }
}

start();

