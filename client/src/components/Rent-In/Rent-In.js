import React from 'react';
import { useEffect } from 'react';
import MetaData from '../MetaData';
import './Rent-In.css';
import Supply from "./Supplies";
import { getSupply } from '../../actions/supplyAction';
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";

const supply = {
    name: "Hammer",
    price: "₹12",
    images: [{url: "https://5.imimg.com/data5/TestImages/BK/AM/ER/SELLER-13631189/hand-hammer-500x500.png"}],
    _id: "1594sampleID151231",
    category : "Hardware Tool",
    avalability_time : {
        from : "13/02/2021",
        to : "14/02/2022"
    },
};

const RentIn = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading, error, supplies, supplyCount} = useSelector(
    (state) => state.supplies
  );

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getSupply());
  }, [dispatch, error, alert]);


  return (
    <div className="Rent-in">
      {
      loading ? "loading ..." : 
        <>
          <MetaData title="padosi-RentIN" />
          <h1 className='heading'>Featured Padosi Supplies</h1>
          <div className="Featured-section">
              { supplies && supplies.map(supply => (
                <Supply item={supply}/>
              ))}
          </div>
        </>
      }
    </div>
  );
}

export default RentIn