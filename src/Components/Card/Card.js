import React from 'react';
import './Card.css'

import { Draggable  } from 'react-beautiful-dnd';

function Card (props) {
    return (
        <Draggable draggableId={props.id} index={props.index}>
                {(provided) => (
                <div className='card' 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                <img className='displayImage'  src={require('../../assets/webkitImage.png')}/>
                <div className='headerWrapper'>
                    <div className='priority'>
                        Urgent
                    </div>
                    <div className='spaceContainer'/>
                    <div className='dueDate'>
                        Due on July 9th
                    </div>
                </div>
                <div className='description'>
                    {props.title}
                </div>
                <div className='utilityWrapper'>
                    <img className="icon" src={require('../../assets/checklist.png')} />
                    <img className="icon" src={require('../../assets/description.png')} alt="Logo" /> 
                </div>
                <div className='progressWrapper'>
                    <div className='progressText'>Progress</div>
                    <div className='spaceContainer'/>
                    <div className='dueDate'>
                        8hrs+
                    </div>
                </div>
                <div className='progessbar'>
                    <div className='progress' style={{width: '50%'}} >25%</div>
                </div>
                <div className='footerWrapper'>
                    <img className='footerIcon' src={require('../../assets/comments.png')}/>
                    <div className='count'>8</div>
                    <img className='footerIcon' src={require('../../assets/attachment.png')}/>
                    <div className='count'>2</div>
                </div>
            </div>
            )}
        </Draggable>
    );
}

export default Card;
