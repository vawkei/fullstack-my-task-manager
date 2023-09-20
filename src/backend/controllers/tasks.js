const Task = require("../model/tasks");
const data = require("../data/Data");

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ success: "failed", msg: error });
  }

  //res.json(data);
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findOne({ _id: id });
    if (!task) {
      return res
        .status(404)
        .json({ success: "false", msg: `id:${id} doesn't exist` });
    } else {
      res.status(200).json({ task });
    }
  } catch (error) {
    res.status(500).json({success:"false",msg:error})
  }
};

const createTask =async (req, res) => {
  
  try{
    let {task}  = req.body;
    console.log(task)
    const tasx =await Task.create({task});
    if(!tasx){
      return res.status(404).json({success:"false",msg:"Input can't be empty"})
    }else{
      res.status(201).json({tasx})
    }
  }catch(error){
    res.status(500).json({success:"false",msg:error})
  }
};

const updateTask =async (req, res) => {
  
  try{
    const { id } = req.params;
    console.log(req.body)  
    const task =await Task.findOneAndUpdate({_id: id},req.body,{
      new:true, runValidators:true
    });

    if(!task){
      return res.status(404).json({success:"false",msg:`id: ${id} does not exist`})
    }else{
      res.status(200).json({id:id,task})
    }
    
  }catch(error){
    res.status(500).json({success:false,msg:error})
  };
  
};

const deleteTask =async (req, res) => {
  
  try{
    const { id } = req.params;
    console.log(id);

    const task = await Task.findOneAndDelete({_id:id},req.body);
    if(!task){
      return res.status(404).json({success:"false",msg:`id: ${id} does not exist`})
    }else{
      res.status(200).json(task)
    }
  }catch(error){
    res.status(500).json({success:false,msg:error})
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
