import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className='navbarWrapper'>
            <div className='logo'>
                Effectivesync
            </div>
            <div className='filler'/>
            <div className='option'>
                About Us
            </div>
            <div className='option'>
                Sign Out
            </div>
        </div>
    )
}

export default Navbar;