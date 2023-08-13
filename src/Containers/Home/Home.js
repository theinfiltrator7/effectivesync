import React, {useState} from 'react';
import './Home.css'
import ReactModal from 'react-modal';

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import initialData from '../../initial-data';
import CardHolder from '../../Components/CardHolder/CardHolder';
import { DragDropContext } from 'react-beautiful-dnd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Home = () => {

    const checklistData = [{checklistId: 'check-1', isDone: true, description: 'do something', hours: 5, isEditing: false},
                        {checklistId: 'check-2', isDone: false, description: 'do something', hours: 2, isEditing: false},
                        {checklistId: 'check-3', isDone: false, description: 'do something', hours: 7, isEditing: false},
                        {checklistId: 'check-4', isDone: true, description: 'do something', hours: 1, isEditing: false}]

    const [data, setData] = useState(initialData);
    const [isCardOpen, setIsCardOpen] = useState(true);
    const [clickedCard, setClickedCard] = useState(null);
    const [checkList, setCheckList] = useState(checklistData);
    const [priority, setPriority] = useState(2)
    const [value, setValue] = useState(null);


    // let currentId = 'task-1';

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

    let closeModalHandler = () => {
        setIsCardOpen(false);
        setClickedCard(null);
    }

    let cardClickHandler = (cardId) => {
        console.log("i am working", cardId)
        setClickedCard(cardId)
    }

    let onItemHoursChangeHandler = (e, index) => {
        let newCheckList = [...checkList];
        let newItem = {...newCheckList[index], hours: e.target.value};
        newCheckList.splice(index, 1, newItem);
        setCheckList(newCheckList);
    }

    let onItemDescriptionChangeHandler = (e, index) => {
        let newCheckList = [...checkList];
        let newItem = {...newCheckList[index], description: e.target.value};
        newCheckList.splice(index, 1, newItem);
        setCheckList(newCheckList);
    }

    let onAddItemHandler = (index) => {
        let newCheckList = [...checkList];
        let newItem = {...newCheckList[index], isEditing: false};
        newCheckList.splice(index, 1, newItem);
        setCheckList(newCheckList);
    }
    
    let onAddNewItemHandler = () => {
        let newCheckList = [...checkList];
        let newItem = {checklistId: 'check-7', isDone: false, description: '', hours: 0, isEditing: true};
        newCheckList.push(newItem);
        setCheckList(newCheckList); 
    }

    let onItemDoneHandler = (index) => {
        let newCheckList = [...checkList];
        let newItem = {...newCheckList[index], isDone: !newCheckList[index].isDone};
        newCheckList.splice(index, 1, newItem);
        setCheckList(newCheckList);
    } 

    let onEditListItem = (index) => {
        let newCheckList = [...checkList];
        let newItem = {...newCheckList[index], isEditing: true};
        newCheckList.splice(index, 1, newItem);
        setCheckList(newCheckList);
    }

    let onPriorityChange = (e) => {
        setPriority(e.target.value)
        console.log(value)
    }

    return (
        <div className='wrapper'>
        <ReactModal 
            isOpen={isCardOpen}  
            onRequestClose={closeModalHandler}
            style={{ overlay: {}, content: {top: '15vh', bottom: '15vh', left: '20vw', right: '20vw', minWidth: 600, backgroundColor: '#A1CCD1'} }}>
            <div>
                <div className='modalHeaderWrapper'>
                    <div >
                        <div className='modalHeading'>List Name</div>
                        <div className='modalSubHeading'>Project List</div>
                    </div>
                    <div className='modalHeaderFiller'/>
                    <div className='modalPriorityWrapper'>
                        <div className='modalSubHeading'>Priority</div>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priority}
                                label="Priority"
                                onChange={onPriorityChange}
                            >
                                <MenuItem value={1}>High</MenuItem>
                                <MenuItem value={2}>Medium</MenuItem>
                                <MenuItem value={3}>Low</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className='modalHeading'>DESCRIPTION</div>
                <textarea className='inputText' defaultValue='Add a more detailed description'/>
                <div className='dueDateWrapper'>
                    <div className='modalHeading'>DUE DATE</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
                <div className='modalHeading'>MEMBERS</div>
                <div style={{paddingBottom: 10}}>@abedabraham98, @manukoshy</div>
                <div className='modalHeading'>CHECKLIST</div>
                <div className='itemHeadingWrapper'>
                    <div className='itemHeadings'>DONE</div>
                    <div className='itemHeadings'>HOURS</div>
                    <div className='itemHeadings'>ITEM DESCRIPTION</div>
                </div>
                {checkList.map((list, i) => {
                    if(!list.isEditing) {
                        return (
                            <div className='checklistWrapper' key={i} onClick={() => onEditListItem(i)}>
                                <Checkbox
                                checked={list.isDone}
                                 onChange={() => onItemDoneHandler(i)}   />
                                <div className='checklistHours'>{`${list.hours} hrs`}</div>
                                <div className='checklistDescription'>{list.description}</div>
                            </div>             
                        )
                    }
                    else {
                        return (
                            <div className='newCheckListWrapper' key={i}>
                                <div className='checklistWrapper'>
                                    <div className='checkListItemWrapper'>
                                        <div style={{paddingLeft: 12}}>Hours</div>
                                        <input className='listInputHours' type = 'number' value={list.hours} onChange={e => onItemHoursChangeHandler(e, i)}/>
                                    </div>
                                    <div className='checkListItemWrapper'>
                                        <div style={{paddingLeft: 12}}>Item Description</div>
                                        <input className='listInputDescription' value={list.description} onChange={e => onItemDescriptionChangeHandler(e, i)} />
                                    </div>
                                </div>
                                    <button className='addItemButton'  onClick={() => onAddItemHandler(i)}>Save</button>
                            </div>
                        )
                    }
                })}
                    <button onClick={onAddNewItemHandler} style={{marginTop: 10, marginBottom: 25}}>Add New Item to Checklist</button>
                    <div className='modalHeading'>COMMENTS</div>
                    <div className='modalCommentWrapper'>
                        <div className='commentNameIcon'>AA</div>
                        <div className='commentContentWrapper'>
                            <div style={{paddingBottom: 10}}>Abed Abraham</div>
                            <div className='commentContent'>make the content in the component bit more bigger </div>
                        </div>
                    </div>
            </div>
        </ReactModal>
        <Navbar/>
        <div className='content'>
            <Sidebar/>
            <DragDropContext
                onDragEnd={onDragEnd}>
                <div className='column'>
                    {data.columnOrder.map(columnId => {
                        const column =data.columns[columnId];
                        const task =  column.taskIds.map(taskId => data.tasks[taskId]);
                        return<CardHolder key={columnId} id={columnId} column={column} task={task} cardCLicked={() => cardClickHandler}/>
                    })}
                </div>
            </DragDropContext>
        </div>
        </div>
    )
}

export default Home;