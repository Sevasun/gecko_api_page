import React from "react";

const Reload = (props) => {
    return (
        <div className="header-top d-flex justify-content-end">
            <button className="btn btn-primary" onClick={ props.onReload }>Reload</button>
        </div>
    );
};

export default Reload;