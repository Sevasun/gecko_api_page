import React from "react";
import Popup from "../popup";

const Coin = (props) => {
  const { children, onCoinClick } = props;

  return (
    <span className="opener" onClick={ onCoinClick } >
      { children }
    </span>
  );
};

export default Coin;
