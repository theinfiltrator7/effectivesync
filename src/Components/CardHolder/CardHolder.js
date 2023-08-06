import React from 'react';
import './CardHolder.css';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';


const CardHolder = (props) => {
    const [array, setArray] = React.useState([1,2,3,4,5,6,67,7,8]);
    // let array = [1,2,3,4,5,6,67,7,8];
    return (
        <div className='cardContainer'>
            <div className='headerContainer'>
                <div className='cardHolderTitle'>
                    {props.column.title}
                </div>
                <img className='cardHolderIcon' src={require('../../assets/options.png')}/>
            </div>
            <Droppable droppableId={props.id}>
                {(provided) => (
                    <div className='holder' ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {props.task.map((task, index)=> {
                            return(  
                                <Card 
                                    key={task.id}
                                    id={task.id}
                                    index={index}
                                    title={task.content} 
                                />)
                        })}
                    {provided.placeholder}
                    </div>
                )}
   
            </Droppable>
            <div className='addCardWrapper'>
                <img className='addCardIcon' src={require('../../assets/plus.png')}/>
                <div className='addCard'>Add New Card</div>
            </div>
        </div>
    )
}

export default CardHolder;