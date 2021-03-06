import React from "react";

import FavoritesButton from "../favorites-button";
import { round, spanColor } from "../../modules/helpers";
import Coin from "../coin";

const CoinTableRow = (props) => {
  const { coins, onCoinClick, favorites, onFavorite } = props;

  const rows = coins.map((coin) => {
    let { name, 
          current_price, 
          id, 
          symbol, 
          market_cap_rank, 
          image, 
          price_change_24h, 
          price_change_percentage_24h } = coin;

    const price_change_percent = price_change_percentage_24h ? spanColor(+price_change_percentage_24h.toFixed(3) + '%') : null;
    const price_change = price_change_24h ? spanColor(round(price_change_24h)) : null;      

    return (
      <tr key={id}>
        <td>
          <FavoritesButton favorites={favorites}
                            coin={id}
                            onFavorite={ () => {onFavorite(id)} } />
        </td>
        <td>{ market_cap_rank }</td>
        <td>
          <Coin onCoinClick={() => { onCoinClick(id) }}>
            { name }
          </Coin>
        </td>
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
  });

  return rows;
};

const CoinTableHead = () => {
  return (
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
  );
};

export { CoinTableHead, CoinTableRow };
