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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);


  const [userBoards, setUserBoards] = useState(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [addingBoard, setAddingBoard] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedCardListId, setSelectedCardListId] = useState(null)
  const [newListTitle, setNewListTitle] = useState("");

  const [boardLists, setBoardLists] = useState();
  const [boardCards, setBoardCards] = useState();

  const [listUpdated, setListUpdated] = useState(false)


  

  useEffect(() => {
    if(!selectedBoard) return;
    getBoardData();
  },[selectedBoard, listUpdated]);

  useEffect(() => {
    getAllBoards();
  },[addingBoard]);

  let createList = () => {
    console.log(selectedBoard)
    axios.post('/list/',  {
        "title": newListTitle,
        "board": selectedBoard
    })
    .then(function (res) {
      setListUpdated(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let getBoardData = () => {
    axios.get(`/board/${selectedBoard}`)
    .then(

      function (res) {
        let obj = {};
        let cards = res.data.cards;
        let lists = res.data.lists;
        if (lists) {
          setBoardLists(lists)
          cards.forEach((card) => {
            if (obj [card.list]) {
            obj [card.list].push(card);
            } else {
            obj [card.list] = [card];
            }
          } ) 
          lists.map((list) => {
            list.cards = obj [list._id]})
            setBoardCards(obj)
            setListUpdated(false)
            setNewListTitle('')
            console.log('this is the board cards', boardCards)
        }
    }
    )
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

  let onAddingNewCardHandler = (id) => {
    console.log(id)
    setIsModalOpen(true);
    setSelectedCardListId(id)
  }

  let onListNameChangeHandler = (e) => {
    setNewListTitle(e.target.value)
  }

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
    setIsModalOpen(false);
    setClickedCard(null);
  };

  let cardClickHandler = (cardId) => {
    setClickedCard(cardId);
    setIsModalOpen(true);
  };

  // let onItemHoursChangeHandler = (e, index) => {
  //   let newCheckList = [...checkList];
  //   let newItem = { ...newCheckList[index], hours: e.target.value };
  //   newCheckList.splice(index, 1, newItem);
  //   setCheckList(newCheckList);
  // };

  // let onItemDescriptionChangeHandler = (e, index) => {
  //   let newCheckList = [...checkList];
  //   let newItem = { ...newCheckList[index], description: e.target.value };
  //   newCheckList.splice(index, 1, newItem);
  //   setCheckList(newCheckList);
  // };

  // let onAddItemHandler = (index) => {
  //   let newCheckList = [...checkList];
  //   let newItem = { ...newCheckList[index], isEditing: false };
  //   newCheckList.splice(index, 1, newItem);
  //   setCheckList(newCheckList);
  // };

    let onCardModalSubmitHandler = (data) => {
      console.log("selected board", selectedBoard)
      axios.post('/card', {
        ...data,
        list: selectedCardListId,
        board: selectedBoard
      })
      .then(function (response) {
        setAddingBoard(false)
        setIsModalOpen(false)
      })
      .catch(function (error) {

        console.log(error);
      });
    }

  // let onAddNewItemHandler = () => {
  //   let newCheckList = [...checkList];
  //   let newItem = {
  //     checklistId: "check-7",
  //     isDone: false,
  //     description: "",
  //     hours: 0,
  //     isEditing: true,
  //   };
  //   newCheckList.push(newItem);
  //   setCheckList(newCheckList);
  // };

  // let onItemDoneHandler = (index) => {
  //   let newCheckList = [...checkList];
  //   let newItem = {
  //     ...newCheckList[index],
  //     isDone: !newCheckList[index].isDone,
  //   };
  //   newCheckList.splice(index, 1, newItem);
  //   setCheckList(newCheckList);
  // };

  // let onEditListItem = (index) => {
  //   let newCheckList = [...checkList];
  //   let newItem = { ...newCheckList[index], isEditing: true };
  //   newCheckList.splice(index, 1, newItem);
  //   setCheckList(newCheckList);
  // };


  let onBoardSelect = (id) => {
    console.log(id)
    setBoardLists(null)
    setSelectedBoard(id)
  }

  function getTitleById(id) {
    const item = userBoards.find(obj => obj._id === id);
    return item ? item.title : null;
}

  return (
    <div className="wrapper">
        <CardModal
            modalClose = {closeModalHandler}
            cardOpen={isModalOpen}
            onSubmit = {onCardModalSubmitHandler}
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
              {boardLists?
               boardLists.map((list) => {
                console.log("i ma listttt", boardLists)
                return (
                  <CardHolder
                    key={list._id}
                    id= {list._id}
                    title = {list.title}
                    data = {list.cards}
                    cardClicked={() => cardClickHandler()}
                    onNewCardHandler = {onAddingNewCardHandler}
                  />
                );
              }
              )
              : null}
            </div>
          </DragDropContext>
        <div className="newListWrapperHome">
          <div>Add new List</div>
          <input onChange={(e) => onListNameChangeHandler(e)} value={newListTitle} type="text" style={{width: 220, fontFamily: 'Ubuntu', marginTop: 10}}/>
          <Button style={{margin: 10,  backgroundColor: '#e0ffff', fontFamily: 'Ubuntu'}} onClick={createList}>Submit</Button>
        </div>
        </div>
            </div>
            : 
            <div className="addListHomeWrapper">
                <div className="addListHome">Add a list to the board to start</div>
                <input type="text" onChange={(e) => onListNameChangeHandler(e)} value={newListTitle} style={{marginLeft: 32, paddingRight: 20, fontFamily: 'Ubuntu', height: 25, width: 200}} />
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
