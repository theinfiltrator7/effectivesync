import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbarWrapper'>
            <div className='logo'>
                Effectivesync
            </div>
            <div className='filler'/>
            <div className='option' style={{paddingRight: 70}}>
                Manage Sprint
            </div>
            <div className='option'>
                About Us
            </div>
            <div className='option'>
                Settings
            </div>
        </div>
    )
}

export default Navbar;