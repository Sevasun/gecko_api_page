import React from "react";
import Loader from "../loader";

const PopupWrap = (props) => {
  const content = props.loading ? <Loader /> : props.children;

  return (
    <div className="popup-holder">
      <div className="popup">
        {content}
      </div>
    </div>
  );
};

export default PopupWrap;