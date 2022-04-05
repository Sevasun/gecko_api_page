import React, { useState, useEffect } from "react";

const FavoritesButton = (props) => {

  const [ isActive, setActive ] = useState(false);

  const onButtonClick = () => {
    setActive((prevActive) => !prevActive);
    props.onFavorite();
  }

  const checkFavorite = () => {
    const { favorites, coin } = props;
    
    if (favorites.length && favorites.includes(coin)) {
      setActive(true);
    }
  }

  useEffect(() => {
    checkFavorite();
  });

  const activeClass = isActive ? 'active' : null;

  return (
    <button className={`star-btn ${activeClass}`} onClick={ onButtonClick }>
      <span className="icon-star-full"></span>
    </button>
  );
}

export default FavoritesButton;