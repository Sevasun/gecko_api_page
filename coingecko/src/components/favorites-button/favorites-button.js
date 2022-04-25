import React, { useState, useEffect } from "react";
import { FavoriteConsumer } from "../context/context";

const FavoritesButton = (props) => {
  return (
    // <FavoriteConsumer>
    //   {(onFavoriteClick) => {
    //     return (
    //       <button className={`star-btn ${activeClass}`} onClick={ onButtonClick }>
    //         <span className="icon-star-full"></span>
    //       </button>
    //     );
    //   }}
    // </FavoriteConsumer>
    <button className={`star-btn ${props.activeClass}`} onClick={ props.onButtonClick }>
      <span className="icon-star-full"></span>
    </button>
  );
};

const withCheckbox = (View) => {
  return class extends React.Component {
    state = {
      active: false
    };

    componentDidMount() {
      this.checkFavorite();
    }

    checkFavorite = () => {
      const { favorites, coin } = this.props;
      
      if (favorites.length && favorites.includes(coin)) {
        this.setState({
          active: true
        })
      }
    };

    onButtonClick = () => {
      this.setState((prevState) => {
        return {
          active: !prevState.active
        }
      });
      this.props.onFavorite();
    }

    render() {
      const activeClass = this.state.active ? 'active' : null;

      return (
        <FavoriteConsumer>
          {
            (onFavoriteClick) => {
              return (
                <View activeClass={activeClass} onButtonClick={this.onButtonClick}/>
              );
            }
          }
        </FavoriteConsumer>
      );
    }
  }
}

export default withCheckbox(FavoritesButton);