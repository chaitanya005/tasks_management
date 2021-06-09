import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./taskBody.css";

import {
  editTask,
  updateTaskState,
  setTaskId,
  getTaskState
} from "../features/DataSlice/DataSclice";
// import {  } from "../features/DataSlice/DataSclice";

const TaskBody = () => {
  const editData = useSelector(getTaskState);
  let token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjMxNTk1NzEsIm5iZiI6MTYyMzE1OTU3MSwianRpIjoiYjFjYzIxMTItNTc2My00MDM5LTk5NTYtOTAxZThiZDg4YzFlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.6VhLutgONj-7U33y6nHGHxnRTlvAIxMl401KBxueqpc";
  const dispatch = useDispatch();
  const [data, setData] = useState({
    task_msg: "",
    assigned_user: "",
    task_date: "",
    task_time: Date.now(),
    is_completed: 0,
    time_zone: Date.now(),
  });

  const handleSubmit = () => {
    if (editData.editTaskData) {
      if (data.assigned_user !== "" && data.is_completed !== ""  && data.task_date !== "" && data.task_time !== "") {
        axios
          .put(
            `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${editData.editTaskData.id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((data) => {
            if (data) {
              handleCancel();
            }
          })
          .catch((e) => console.log(e));
      }
    } else {
      if (data.assigned_user !== "" && data.is_completed !== ""  && data.task_date !== "" && data.task_time !== "") {
        // console.log(data)
     axios
        .post(
          "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => {
          if (data) {
            dispatch(setTaskId({ taskIds: data.data.results.id }));
            handleCancel();
          }
        })
        .catch((e) => console.log(e));
      } else {
        alert("Please fill All the fields!")
      }
    }
  };

  const handleCancel = () => {
    dispatch(updateTaskState({ taskIsHidden: true }));
    dispatch(editTask({ editTaskData: null }));
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38/${editData.editTaskData.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        if (data) {
          handleCancel();
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (editData.editTaskData) {
      setData({
        ...data,
        task_msg: editData.editTaskData.task_msg,
        assigned_user: editData.editTaskData.assigned_user,
        task_date: editData.editTaskData.task_date,
      });
    }
  }, []);

  return (
    <div className="task_body">
      <div className="task_description">
        <div>Task Description</div>
        <input
          placeholder="Task Description"
          value={data.task_msg}
          onChange={(e) => setData({ ...data, task_msg: e.target.value })}
        />
      </div>
      <div className="date_time">
        <div className="date">
          <div>Date</div>
          <input
            type="date"
            value={data.task_date}
            onChange={(e) => setData({ ...data, task_date: e.target.value })}
          />
        </div>
        <div className="time">
          <div>Time</div>
          <input
            type="time"
            onChange={(e) => setData({ ...data, task_time: Date.now() })}
          />
        </div>
      </div>
      <div className="assign_user">
        <div>Assign User</div>
        <input
          placeholder="User Name"
          value={data.assigned_user}
          onChange={(e) => setData({ ...data, assigned_user: e.target.value })}
        />
      </div>
      <div style  = {{display: "flex", justifyContent: "space-between"}}>
        <div>
          {editData.editTaskData && (
            <button
              className="form_button cancel"
              onClick={handleDelete}
            >
              <i className="fa fa-trash" style = {{fontSize: '20px'}}></i>
            </button>
          )}
        </div>
        <div>
          <button
            className="form_button cancel"
            style={{ marginRight: "10px" }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="form_button submit" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBody;
