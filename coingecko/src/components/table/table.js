import React from "react";

import './table.css';
import Loader from "../loader";

const Table = (props) => {
  const { coins, head } = props;

  if (!coins) {
    return <Loader />;
  }

  return (
    <table className="coin-table">
      <thead>
        { head }
      </thead>
      <tbody>
        { props.children }
      </tbody>
    </table>
  );
};

export default Table;