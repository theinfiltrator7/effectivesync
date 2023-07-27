import React from 'react';
import './Card.css'

function Card (props) {
    return (
        <div className='card'>
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
                Webkit development
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
    );
}

export default Card;
