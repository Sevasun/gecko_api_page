import React from "react";

const Pagination = (props) => {
    const disabled = props.currentPage <= 1 ? 'disabled' : null;
    return (
        <div className="pagination d-flex justify-content-between my-3">
            <button className="btn btn-primary" onClick={props.onClickPrev} disabled={disabled}>Prev</button>
            <button className="btn btn-primary" onClick={props.onClickNext}>Next</button>
        </div>
    );
};

export default Pagination;