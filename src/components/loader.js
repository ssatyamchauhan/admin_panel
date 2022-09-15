import React from "react";
import "../styling/styles/loader.css";


const Loader = ({ start = 0 }) => {
    return start ? <div className="loader"></div> : <></>
}


export default Loader;