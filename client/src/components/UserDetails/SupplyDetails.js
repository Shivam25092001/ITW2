import React, {useEffect, match} from "react";
import "./SupplyDetails.css";
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from "react-redux";
import { getSupplyDetails } from "../../actions/supplyAction";
import { useParams } from "react-router-dom";

const SupplyDetails = ({match}) => {

  const dispatch = useDispatch();

  const {supply, loading, error} = useSelector((state) => state.supplyDetails);

  const {id} = useParams();
  useEffect (()=>{
    dispatch(getSupplyDetails(id));
  }, [dispatch, id]);


  return (
    <div className="SupplyDetail">
      <Carousel>
        {
          supply.images && 
          supply.images.map((item, i) => (
            <img className="CarouselImage" 
            key={item.url} 
            src= {item.url} 
            alt={`${i} Slide`} />
          ))
        }
      </Carousel>
    </div>
  );
};

export default SupplyDetails;
