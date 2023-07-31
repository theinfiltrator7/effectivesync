import React, {useState} from 'react';
import './Home.css'
import initialData from '../../initial-data';
import CardHolder from '../../Components/CardHolder/CardHolder';
import { DragDropContext } from 'react-beautiful-dnd';

const Home = () => {
    const [data, setData] = useState(initialData);

    let onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if(!destination) return;

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index) {
                return;
            }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0 , draggableId)
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }
            console.log("hello", newColumn)
    
            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
                }
                setData(newState)
                return;
        }
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice (source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
            };
            
        const finishTaskIds = Array.from(finish. taskIds);
        finishTaskIds.splice (destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
         taskIds: finishTaskIds, };

            const newState = {
                ...data,    
                columns: {
                ...data.columns, 
                [newStart.id]: newStart, 
                [newFinish.id]: newFinish,
            }}

            setData(newState);

    }
    return (
        <DragDropContext
            onDragEnd={onDragEnd}>
            <div className='wrapper'>
                {data.columnOrder.map(columnId => {
                    const column =data.columns[columnId];
                    const task =  column.taskIds.map(taskId => data.tasks[taskId]);
                    return<CardHolder key={columnId} id={columnId} column={column} task={task}/>
                })}
            </div>
        </DragDropContext>
    )
}

export default Home;