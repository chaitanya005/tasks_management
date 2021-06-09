import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./tasks.css"

import {
  updateTaskState,
  editTask,
  getTaskState,
} from "../features/DataSlice/DataSclice";

const Tasks = () => {
  const dispatch = useDispatch();
  const taskState = useSelector(getTaskState);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjMxNTk1NzEsIm5iZiI6MTYyMzE1OTU3MSwianRpIjoiYjFjYzIxMTItNTc2My00MDM5LTk5NTYtOTAxZThiZDg4YzFlIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1YmkgU2lyIiwiZW1haWwiOiJzbWl0aGNoZXJ5bEB5YWhvby5jb20iLCJ1c2VyX2lkIjoidXNlcl82YmVlYzQ1OTkxNWY0NTA3YThkMjUyMGU2MGUwM2MzZSIsImNvbXBhbnlfaWQiOiJjb21wYW55XzNjNjhjZDk0ZWJkNjQ4Yzc4ZDc2ODcyY2ZhOWY4Y2ZiIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9mMmU5YWNkZWM4MTdlMjRkMjk4MGQ4NTNlODkzODVmNT9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.6VhLutgONj-7U33y6nHGHxnRTlvAIxMl401KBxueqpc";
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://stage.api.sloovi.com/task/lead_6996a7dcdddc4af3b4f71ccb985cea38",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) =>
        setData(
          data.data.results
            .filter((item) => taskState.taskIds.includes(item.id))
            .reverse()
        )
      )
      .catch((e) => console.log(e));
  }, [taskState.taskIsHidden]);

  const handleEdit = (item) => {
    dispatch(updateTaskState({ taskIsHidden: false }));
    dispatch(editTask({ editTaskData: item }));
  };

  

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <div key = {index} className = "tasks">
            <div>
              <div style = {{fontSize: '20px'}}>{item.task_msg}</div>
              <p>{item.task_date}</p>
            </div>
              <button
                className="form_button edit"
                onClick={() => handleEdit(item)}
              >
              <i class="fa fa-pencil" style = {{fontSize: '20px'}}></i>
              </button>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
