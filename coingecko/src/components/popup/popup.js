import React, { Component } from "react";
import "./popup.css";
import PopupWrap from "../popup-wrap";
import { round, spanColor } from "../../modules/helpers";

export default class Popup extends Component {
  state = {
    coin: null
  };

  componentDidMount() {
    this.getInfo(this.props.id);
  }

  getInfo = (id) => {
    this.props.getCoinInfo(id).then((data) => {
      this.setState({
        coin: data
      })
    })
  }
  
  render() {

    const { 
          id = "",
          symbol = "",
          image = "",
          market_data = {},
          market_cap_rank = 0 } = this.state.coin || {};

    const title = id.length ? id[0].toUpperCase() + id.substring(1) : '';
    const ticker = symbol.toUpperCase();
    const { 
          current_price = 0,
          ath = 0,
          price_change_24h_in_currency = 0,
          price_change_percentage_1h_in_currency = 0 } = market_data;

    const price_24h = spanColor(round(price_change_24h_in_currency.usd));
    const price_24h_percent = spanColor(round((1 - (current_price.usd - price_change_24h_in_currency.usd) / current_price.usd) * 100));
    const price_1h = spanColor(round(current_price.usd * price_change_percentage_1h_in_currency.usd / 100));
    const price_1h_percent = spanColor(round(price_change_percentage_1h_in_currency.usd));

    return (
      <PopupWrap loading={!this.state.coin}>
        <div className="popup-header">
          <h2>
            {title}
          </h2>
          <button className="popup-close" onClick={ this.props.closePopup }></button>
        </div>
        <div className="popup-body">
          <div className="text-center">
            <img src={image.small} alt={title} className="my-3" />
          </div>
          <div className="coin-info-list">
            <div className="coin-info-item">
              <div className="coin-info-title">Rank</div>
              <div className="coin-info-body">{ market_cap_rank }</div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">Ticker</div>
              <div className="coin-info-body">{ ticker }</div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">Price</div>
              <div className="coin-info-body">
                <span className="text-warning">{ current_price.usd }</span>
              </div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">ATH</div>
              <div className="coin-info-body">
                <span className="text-warning">{ ath.usd }</span>
              </div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">1h price change</div>
              <div className="coin-info-body">{ price_1h }</div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">1h price change, %</div>
              <div className="coin-info-body">{ price_1h_percent }</div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">24h price change</div>
              <div className="coin-info-body">{ price_24h }</div>
            </div>
            <div className="coin-info-item">
              <div className="coin-info-title">24h price change, %</div>
              <div className="coin-info-body">{ price_24h_percent }</div>
            </div>
          </div>
        </div>
      </PopupWrap>
    );
  }
}


