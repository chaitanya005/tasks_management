import './taskHeader.css'
import {useDispatch}from 'react-redux'

import {updateTaskState} from '../features/DataSlice/DataSclice'

const TaskHeader = () =>{
    const dispatch  = useDispatch()

    const handleClick = () =>{
        dispatch(updateTaskState({taskIsHidden : false}))
    }
    return (
        <div className="task_header">
            <div className="task_head">TASKS</div>
            <div>
                <button onClick={handleClick}> + </button>
            </div>
        </div>
    )
}

export default TaskHeader