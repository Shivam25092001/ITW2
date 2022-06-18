import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    const [toggle, setToggle] = useState(false);
    return (
        <nav className="Navbar">
            <div className="top-section">
                <div className="logo">padosi</div>
                <div className="login-info">Login</div>
                {/* hamburger-icon */}
                <div className={toggle ? "burger-active" : "burger"} onClick={()=> setToggle(!toggle)}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                </div>
            </div>
            <div className={toggle ? "bottom-section-active" : "bottom-section"}>
                <ul className="nav-links">
                    <li className="nav-link"><Link to='/rent-in'>All</Link></li>
                    <li className="nav-link"><Link to='#'>Frequent Rentals</Link></li>
                    <li className="nav-link"><Link to='#'>Motor-Vehicles</Link></li>
                    <li className="nav-link"><Link to='#'>Hardware</Link></li>
                    <li className="nav-link"><Link to='#'>Search</Link></li>
                </ul>
            </div>
        </nav>
    );
}