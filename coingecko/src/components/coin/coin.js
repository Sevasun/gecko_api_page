import React from "react";

const Coin = (props) => {
  const { children, onCoinClick } = props;

  return (
    <span className="opener" onClick={ onCoinClick } >
      { children }
    </span>
  );
};

export default Coin;
