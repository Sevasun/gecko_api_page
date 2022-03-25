import React, { Component } from "react";

export default class FavoritesButton extends Component {
  state = {
    isActive: false,
  };

  onButtonClick = () => {
    this.setState((prevState) => {
      return {isActive: !prevState.isActive}
    });
    this.props.onFavorite(this.props.id);
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
