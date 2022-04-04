import React from "react";
import './dropdown.css';

const Dropdown = (props) => {
  const { coinList = [] } = props;
  const dropdownItems = coinList.map((item) => {
    return (
      <div className="dropdown-item" key={item.id}>
        <span className="position text-primary me-3">{ item.market_cap_rank }</span>
        <span className="item-name text-success">{ item.name }</span>
      </div>
    );
  })

  return (
    <div className="dropdown">
      { dropdownItems }
    </div>
  );
};

export default Dropdown;