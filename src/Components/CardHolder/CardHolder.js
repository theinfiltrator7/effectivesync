import React from 'react';
import './CardHolder.css';
import Card from '../Card/Card';

const CardHolder = () => {
    const [array, setArray] = React.useState([1,2,3,4,5,6,67,7,8]);
    // let array = [1,2,3,4,5,6,67,7,8];

    return (
        <div className='cardContainer'>
            <div className='headerContainer'>
                <div className='cardHolderTitle'>
                    Points for meeting
                </div>
                <img className='icon' src={require('../../assets/options.png')}/>
                {/* <div className='TitleOptions'>small</div> */}
            </div>
            {array.map((item, index)=> {
      return(  
        <Card 
            key={index} />)
            }

      )}
        </div>
    )
}

export default CardHolder;