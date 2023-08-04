import React from 'react';
import './Members.css';

import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Members = () => {
    return (
    <div>
        <Navbar/>
        <div className='content'>
            <Sidebar/>
        </div>
    </div>

    )
}

export default Members;