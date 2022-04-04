import React from "react";
import TabContent from "../tab-content";

const ErrorMessage = (props) => {
  const { title, message } = props;

  return (
    <TabContent className="text-center">
      <h2>{title}</h2>
      <p>{message}</p>
    </TabContent>
  );
};

export default ErrorMessage;
