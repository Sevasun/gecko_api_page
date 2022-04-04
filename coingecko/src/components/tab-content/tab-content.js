import React from "react";

const TabContent = (props) => {
  const { className } = props;

  return (
    <div className={`content ${className}`}>
      <div className="tab">
        { props.children }
      </div>
    </div>
  );
};

export default TabContent;
