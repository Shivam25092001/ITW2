import React from "react";  
import './Intro.css';
import {Link} from "react-router-dom";

export default function Intro() {
    return (
        <div className="home">
            <div className="left child">
                <h2 className="title">Want to earn while spreading Happiness at the same time ?</h2>
                <br/>
                <button className="left-button">Rent-Out</button>
            </div>
            <div className="line"></div>
            <div className="right child">
                <h2 className="title">Urgent need of something for a while ?</h2>
                <br/>
                <button className="right-button"><Link to='/rent-in'>Rent In</Link></button>
            </div>
        </div>
    )
}