import classes from "./EditTask.module.css";
import Card from "./ui/Card";

const EditTask = () => {
  return (
    <Card className={classes.card}>
      <h2>Edit Task</h2>
      <form>
        <div className={classes.control}>
          <label htmlFor="">TaskID</label>
          <input type="text" />
        </div>
        <div className={classes.control}>
          <label htmlFor="">Task</label>
          <input type="text" />
        </div>
        <div className={classes.action}>
          <button>Edit</button>
        </div>
      </form>
    </Card>
  );
};

export default EditTask;
