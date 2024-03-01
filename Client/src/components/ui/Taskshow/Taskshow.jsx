import "./Taskshow.css";
import tick from "../../../assets/tick.svg";
const Taskshow = ({ task = {} }) => {
  const styles = {
    backgroundColor: "#17A2B8",
    cursor: "pointer",
  };

  return (
    <div className="input-inside">
      <div className="inptt-radio">
        <div style={task?.completed ? styles : {}} className="inpt-radio">
          {task?.completed && <img src={tick} />}
        </div>
      </div>
      <h3>{task?.title}</h3>
    </div>
  );
};

export { Taskshow };
