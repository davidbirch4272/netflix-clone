import React from "react"
import "./Banner.css";


function Banner () {
  return (
  <header 
    className="banner" 
    style={{
    bacckgroundSize: "cover",
    backgroundImage: `url("https://i.imgur.com/e1hLQ2m.png")`,
    backgroundPosition:  "center center",
  }} 
  >
    <div className="banner__contents">
        <h1 className="banner__title">Movie Name</h1>
        <div className="banner__buttons">
            <button className='banner__button'>Play</button>
            <button className='banner__button'>My List</button>
        </div>
    <h1 className="banner__description">This is a test banner description.</h1>
    </div>
  </header>  
  );    
};

export default Banner;

