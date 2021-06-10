import React from "react";
import { useSelector } from "react-redux";

import TaskHeader from "./components/TaskHeader";
import TaskBody from "./components/TaskBody";
import Tasks from "./components/Tasks";

import { getTaskState } from "./features/DataSlice/DataSclice";

import "./App.css";

function App() {
  const isHidden = useSelector(getTaskState);

  return (
    <div className="App">
      <div style = {{display: 'flex', flexDirection: 'row'}}>
        <div className="Side-bar"></div>
        <div className="top-bar">
          <div className = "task">
            <TaskHeader />
            {!isHidden.taskBodyIsHidden ? <TaskBody /> : null}
            <Tasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
