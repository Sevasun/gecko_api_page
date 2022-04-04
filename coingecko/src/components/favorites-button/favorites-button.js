import React, { Component } from "react";

export default class FavoritesButton extends Component {
  state = {
    isActive: false
  };

  componentDidMount() {
    this.checkFavorite();
  }

  onButtonClick = () => {
    this.setState((prevState) => {
      return {isActive: !prevState.isActive}
    });
    this.props.onFavorite();
  }

  checkFavorite = () => {
    const { favorites, coin } = this.props;
    
    if (favorites.length && favorites.includes(coin)) {
      this.setState({
        isActive: true
      })
    }
  }

  render() {
    const activeClass = this.state.isActive ? 'active' : null;

    return (
      <button className={`star-btn ${activeClass}`} onClick={ this.onButtonClick }>
        <span className="icon-star-full"></span>
      </button>
    );
  }
}
