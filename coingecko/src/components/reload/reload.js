import React from "react";

const Reload = (props) => {
    return (
        <button className="btn btn-primary" onClick={ props.onReload }>Reload</button>
    );
};

export default Reload;