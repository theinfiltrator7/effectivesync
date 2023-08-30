import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";

import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import initialData from "../../initial-data";
import CardHolder from "../../Components/CardHolder/CardHolder";
import { DragDropContext } from "react-beautiful-dnd";
import CardModal from "../../Components/CardModal/CardModal";
import { Button } from "antd";


const Home = () => {
  const checklistData = [
    {
      checklistId: "check-1",
      isDone: true,
      description: "do something",
      hours: 5,
      isEditing: false,
    },
    {
      checklistId: "check-2",
      isDone: false,
      description: "do something",
      hours: 2,
      isEditing: false,
    },
    {
      checklistId: "check-3",
      isDone: false,
      description: "do something",
      hours: 7,
      isEditing: false,
    },
    {
      checklistId: "check-4",
      isDone: true,
      description: "do something",
      hours: 1,
      isEditing: false,
    },
  ];

  const listData = [{ name: "Create a react app", listName: "To Do" }];

  const [data, setData] = useState(initialData);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [checkList, setCheckList] = useState(checklistData);
  const [priority, setPriority] = useState(2);
  const [value, setValue] = useState(null);

  const [userBoards, setUserBoards] = useState(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [addingBoard, setAddingBoard] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [newListTitle, setNewListTitle] = useState("");

  

  useEffect(() => {
    if(!selectedBoard) return;
    getBoardData();
  },[selectedBoard]);

  useEffect(() => {
    getAllBoards();
  },[addingBoard]);

  let createList = () => {
    console.log(selectedBoard)
    axios.post('/list/',  {
        "title": "Sample fftitle",
        "board": selectedBoard
    })
    .then(function (res) {
        console.log('i am creating list', res)
    //   let boardData = [];
    //   boardData = boardData.concat(res.data.user.adminBoard)
    //   boardData = boardData.concat(res.data.user.userBoard)
    //   setUserBoards(boardData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let getBoardData = () => {
    axios.get(`/board/${selectedBoard}`)
    .then(function (res) {

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let getAllBoards = () => {
    axios.get('/board')
    .then(function (res) {
      let boardData = [];
      boardData = boardData.concat(res.data.user.adminBoard)
      boardData = boardData.concat(res.data.user.userBoard)
      setUserBoards(boardData);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let onSubmit = () => {
    axios.post('/board', {
      "title": newBoardName
    })
    .then(function (response) {
      setAddingBoard(false)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let boardNameHandler = (e) => {
    let boardName = e.target.value;
    setNewBoardName(boardName);
  };

  let addBoardHandler = () => {
    setAddingBoard(true);
  };

  let onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      console.log("hello", newColumn);

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  let closeModalHandler = () => {
    setIsCardOpen(false);
    setClickedCard(null);
  };

  let cardClickHandler = (cardId) => {
    console.log("i am working", cardId);
    setClickedCard(cardId);
    setIsCardOpen(true);
    console.log(isCardOpen)
  };

  let onItemHoursChangeHandler = (e, index) => {
    let newCheckList = [...checkList];
    let newItem = { ...newCheckList[index], hours: e.target.value };
    newCheckList.splice(index, 1, newItem);
    setCheckList(newCheckList);
  };

  let onItemDescriptionChangeHandler = (e, index) => {
    let newCheckList = [...checkList];
    let newItem = { ...newCheckList[index], description: e.target.value };
    newCheckList.splice(index, 1, newItem);
    setCheckList(newCheckList);
  };

  let onAddItemHandler = (index) => {
    let newCheckList = [...checkList];
    let newItem = { ...newCheckList[index], isEditing: false };
    newCheckList.splice(index, 1, newItem);
    setCheckList(newCheckList);
  };

  let onAddNewItemHandler = () => {
    let newCheckList = [...checkList];
    let newItem = {
      checklistId: "check-7",
      isDone: false,
      description: "",
      hours: 0,
      isEditing: true,
    };
    newCheckList.push(newItem);
    setCheckList(newCheckList);
  };

  let onItemDoneHandler = (index) => {
    let newCheckList = [...checkList];
    let newItem = {
      ...newCheckList[index],
      isDone: !newCheckList[index].isDone,
    };
    newCheckList.splice(index, 1, newItem);
    setCheckList(newCheckList);
  };

  let onEditListItem = (index) => {
    let newCheckList = [...checkList];
    let newItem = { ...newCheckList[index], isEditing: true };
    newCheckList.splice(index, 1, newItem);
    setCheckList(newCheckList);
  };

  let onPriorityChange = (e) => {
    setPriority(e.target.value);
    console.log(value);
  };

  let onBoardSelect = (id) => {
    console.log(id)
    setSelectedBoard(id)
  }

  function getTitleById(id) {
    const item = userBoards.find(obj => obj._id === id);
    return item ? item.title : null;
}

  return (
    <div className="wrapper">
        <CardModal
            cardOpen={isCardOpen}
            priority = {priority}
            closeModalHandler = {closeModalHandler}
            onPriorityChange = {onPriorityChange}
            onAddNewItemHandler = {onAddNewItemHandler}
            />
      <Navbar />
      <div className="content">
        <Sidebar 
              userBoards = {userBoards}
              addingBoard = {addingBoard}
              setAddingBoard = {setAddingBoard}
              boardNameHandler = {boardNameHandler}
              onSubmit = {onSubmit}
              addBoardHandler = {addBoardHandler}
              onBoardSelect = {onBoardSelect}
            />
        <div className="homeContent">
            {selectedBoard? <div>
                <div className="homeBoardTitle">{getTitleById(selectedBoard)}</div>
        <div className="homeSubContent">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="column">
              {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const task = column.taskIds.map((taskId) => data.tasks[taskId]);
                return (
                  <CardHolder
                    key={columnId}
                    id={columnId}
                    column={column}
                    task={task}
                    cardClicked={() => cardClickHandler()}
                  />
                );
              })}
            </div>
          </DragDropContext>
        <div className="newListWrapperHome">
          <div>Add new List</div>
          <input type="text" style={{width: 220, fontFamily: 'Ubuntu', marginTop: 10}}/>
          <Button style={{margin: 10,  backgroundColor: '#e0ffff', fontFamily: 'Ubuntu'}} onClick={createList}>Submit</Button>
        </div>
        </div>
            </div>
            : 
            <div className="addListHomeWrapper">
                <div className="addListHome">Add a list to the board to start</div>
                <input type="text" style={{marginLeft: 32, paddingRight: 20, fontFamily: 'Ubuntu', height: 25, width: 200}} />
                <Button style={{margin: 10,  backgroundColor: '#e0ffff', fontFamily: 'Ubuntu'}} onClick={createList}>Add list</Button>
            </div>
            }
        </div>

        {/* {checkList? } */}
      </div>
    </div>
  );
};

export default Home;
