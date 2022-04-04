import React, { useState } from "react";
import GeckoApi from "../../modules/gecko";
import Dropdown from "../dropdown";
import './search-form.css';

const SearchForm = () => {
  const { searchCoin } = new GeckoApi();
  const [coins, setCoins] = useState(null);
  const searchOnChange = (searchText) => {
    if (searchText.length >= 2) {
      searchCoin(searchText).then((obj) => setCoins(obj.coins));
    } else {
      setCoins(null);
    }
  }

  const searchOnSubmit = (event, searchText) => {
    event.preventDefault();
    console.log(searchText);
  }

  const dropdown = coins ? <Dropdown coinList={coins} /> : null;

  return (
    <form className="search-form" onSubmit={(e) => searchOnSubmit(e, e.target)}>
      <input type="search" placeholder="Search coin" onChange={(e) => searchOnChange(e.target.value)} />
      <button type="submit">
        <span className="icon-search"></span>
      </button>
      { dropdown }
    </form>
  );
};

export default SearchForm;
