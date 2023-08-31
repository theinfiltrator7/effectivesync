import React from "react";
import "./CardHolder.css";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";

const CardHolder = (props) => {

  return (
    <div className="cardContainer">
      <div className="headerContainer">
        <div className="cardHolderTitle">{props.title}</div>
        <img
          className="cardHolderIcon"
          src={require("../../assets/options.png")}
        />
      </div>
      {props.data? 
            <Droppable droppableId={props.id}>
            {(provided) => (
              <div
                className="holder"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                
                {props.data.map((card, index) => {
                  console.log("card data",card)
                  return (
                    <Card
                      key={card._id}
                      id={card._id}
                      title={card.title}
                      data={card}
                      cardClicked = {() => props.cardClicked()}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>: null}

      <div className="addCardWrapper" onClick={() => props.onNewCardHandler(props.data._id)}>
        <img className="addCardIcon" src={require("../../assets/plus.png")} />
        <div className="addCard">Add New Card</div>
      </div>
    </div>
  );
};

export default CardHolder;
