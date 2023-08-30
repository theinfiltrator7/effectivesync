import React from "react";
import "./Card.css";

import { Draggable } from "react-beautiful-dnd";
import { Button } from "antd";

function Card (props) {
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
      isDone: true,
      description: "do something",
      hours: 2,
      isEditing: false,
    },
    {
      checklistId: "check-3",
      isDone: true,
      description: "do something",
      hours: 7,
      isEditing: false,
    },
    {
      checklistId: "check-4",
      isDone: false,
      description: "do something",
      hours: 1,
      isEditing: false,
    },
  ];

  const totalHours = checklistData.reduce((sum, item) => sum + item.hours, 0);
  const hoursDone = checklistData
    .filter((item) => item.isDone)
    .reduce((sum, item) => sum + item.hours, 0);
  const progressPercent = (hoursDone / totalHours) * 100;
  const getColor = (priority) => {
    switch (priority) {
      case "HIGH":
        return "red";
      case "MEDIUM":
        return "orange";
      case "LOW":
        return "green";
      default:
        return "grey";
    }
  };
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          className="card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* {props.data.image ? (
            <img className="displayImage" src={props.data.image} alt="img" />
          ) : null} */}
          <div className="headerWrapper">
            <div
              className="priority"
              style={{ backgroundColor: getColor(props.data.priority) }}
            >
              {props.data.priority}
            </div>
            <div className="spaceContainer" />
            <div className="dueDate">Due on July 9th</div>
          </div>
          <div className="description">{props.data.content}</div>
          <div className="utilityWrapper">
            <img
              className="cardIcon"
              src={require("../../assets/checklist.png")}
            />
            <img
              className="cardIcon"
              src={require("../../assets/description.png")}
              alt="Logo"
            />
          </div>
          <div className="progressWrapper">
            <div className="progressText">Progress</div>
            <div className="spaceContainer" />
            <div className="dueDate">{totalHours}hrs+</div>
          </div>
          <div className="progessbar">
            <div
              className="progress"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="footerWrapper">
            <img
              className="footerIcon"
              src={require("../../assets/comments.png")}
            />
            <div className="count">8</div>
            <img
              className="footerIcon"
              src={require("../../assets/attachment.png")}
            />
            <div className="count">2</div>
            <div className="spaceContainer" />
            <Button style={{marginRight: 10, marginBottom: 10,  backgroundColor: '#e0ffff', fontFamily: 'Ubuntu', zIndex: 0}} size="small" onClick={() => props.cardClicked('sfs3jrsdjhfowieuh454o3i')}>EDIT CARD</Button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
