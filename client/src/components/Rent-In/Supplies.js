import React , {useState} from "react";
import {Link} from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import "./Supplies.css";
import {parser} from 'any-date-parser'


const Supply = ({item})=>{

    const options = {
        edit: false,
        activeColor: "blue",
        value: item.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
        color: "rgba(20, 20, 20, 0.1)"
    };



    return(
        <Link to={`supplies/${item._id}`} className="supplyItemCard">
                <div className="photo">
                    <img src={item.images[0].url} alt="supply"/>
                </div>
                <div className="description">
                    <h2>{item.name}</h2>
                    <h4><ReactStars {...options} /> <span>{item.numOfReviews} Reviews</span></h4>
                    <div>
                        <h1>₹{item.price}</h1>
                        {/* <span>{parser.fromString(item.avalability_time.from)} - {parser.fromString(item.avalability_time.to)}</span> */}
                    </div>
                    <div className="supplyItemCard-buttons">
                        <button>Rent In</button>
                        <button>Wishlist</button>
                    </div>
                </div>
        </Link>
    );
}

export default Supply;