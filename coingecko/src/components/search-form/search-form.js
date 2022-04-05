import React, { useState, useEffect } from "react";
import GeckoApi from "../../modules/gecko";
import Dropdown from "../dropdown";
import './search-form.css';

const SearchForm = (props) => {
  const { searchCoin } = new GeckoApi();
  const [coins, setCoins] = useState(null);
  const [value, setValue] = useState('');

  const searchOnChange = (searchText) => {
    setValue(searchText);

    if (searchText.length >= 2 && value) {
      searchCoin(searchText).then((obj) => setCoins(obj.coins));
    } else {
      setCoins(null);
    }
  }

  useEffect(() => {
    if (props.popup) {
      setValue('');
      setCoins(null);
    }
  }, [props.popup]);

  const searchOnSubmit = (event, searchText) => {
    event.preventDefault();
  }

  const dropdown = coins ? <Dropdown coinList={coins} onItemClick={props.onItemClick} /> : null;

  return (
    <form className="search-form" onSubmit={(e) => searchOnSubmit(e, e.target)}>
      <input type="search" placeholder="Search coin" onChange={(e) => searchOnChange(e.target.value)} value={value} />
      <button type="submit">
        <span className="icon-search"></span>
      </button>
      { dropdown }
    </form>
  );
};

export default SearchForm;
