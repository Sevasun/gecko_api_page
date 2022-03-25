import React, { Component } from "react";
import GeckoApi from "../../modules/gecko/gecko";
import Loader from "../loader";
import './table.css';
import FavoritesButton from "../favorites-button";

export default class Table extends Component {
  api = new GeckoApi();

  state = {
    coins: null,
    ids: []
  }

  componentDidMount() {
    this.updateCoinList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reload !== prevProps.reload) {
      this.updateCoinList();
    }
  }

  updateCoinList = () => {
    this.api.coinsList().then((array) => {
      this.setState({
        coins: array
      })
    });
  }

  onFavorite = (id) => {
    const { ids } = this.state;
    let newIds;
    const idx = ids.indexOf(id);

    if (idx === -1) {
      newIds = [...ids, id];
    } else {
      newIds = [...ids.slice(0, idx), ...ids.slice(idx + 1)];
    }
    this.setState({
      ids: newIds
    })
  }

  render() {
    if (!this.state.coins) {
      return <Loader />;
    }
    console.log(this.state.ids);

    const round = (number) => {
      const module = Math.abs(+number);

      if (module < 0.00001) {
        return +number.toFixed(8);
      } else if (module < 0.0001) {
        return +number.toFixed(7);
      } else if (module < 0.001) {
        return +number.toFixed(6);
      } else if (module < 0.01) {
        return +number.toFixed(5);
      } else if (module < 0.1) {
        return +number.toFixed(4);
      } else if (module < 1) {
        return +number.toFixed(3);
      } else if (module < 10) {
        return +number.toFixed(2);
      } else {
        return +number;
      }
    };

    const spanColor = (number) => {
      if (parseFloat(number) > 0) {
        return <span className='text-success'>{number}</span>
      } else if (parseFloat(number) < 0) {
        return <span className='text-danger'>{number}</span>
      } else {
        return <span className='text-warning'>{number}</span>
      }
    }

    const rows = this.state.coins.map((coin) => {
      let { name, 
              current_price, 
              id, 
              symbol, 
              market_cap_rank, 
              image, 
              price_change_24h, 
              price_change_percentage_24h } = coin;

      const price_change_percent = spanColor(+price_change_percentage_24h.toFixed(3) + '%');
      const price_change = spanColor(round(price_change_24h));      

      return (
        <tr key={id}>
          <td>
            <FavoritesButton onFavorite={ this.onFavorite } id={id} />
          </td>
          <td>{ market_cap_rank }</td>
          <td>{ name }</td>
          <td>
            <span className="fw-bold text-white">{ symbol.toUpperCase() }</span>
          </td>
          <td>
            <img
              src={image}
              className="coin-image"
              alt="icon"
            />
          </td>
          <td>
            <span className="text-warning price-cell">
              { current_price }
            </span>
          </td>
          <td>
            { price_change }
          </td>
          <td>
            { price_change_percent }
          </td>
        </tr>
      );
    })

    // const { name, current_price, id, symbol, image, price_change_24h, price_change_percentage_24h } = this.state.coins;

    return (
      <table className="coin-table">
        <thead>
          <tr>
            <th></th>
            <th>Rank</th>
            <th>Coin name</th>
            <th>Ticker</th>
            <th>Image</th>
            <th>Price, USD</th>
            <th>24h change, USD</th>
            <th>24h change, %</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}
