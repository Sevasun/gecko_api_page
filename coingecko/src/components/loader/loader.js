import React from "react";
import './loader.css';

const Loader = () => {
    return(
        <div className="spinner-gear"><div className="spinner-inner">
        <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div></div>
    );
}

export default Loader;