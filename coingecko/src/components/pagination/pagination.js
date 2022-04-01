import React from "react";
import './pagination.css';

const Pagination = (props) => {
    const disabled = props.currentOptions.page <= 1 ? 'disabled' : null;
    const currentPerPage = props.currentOptions.per_page;
    return (
        <div className="pagination d-flex justify-content-between my-3">
            <button className="btn btn-primary" onClick={props.onClickPrev} disabled={disabled}>Prev</button>
            <div className="select-wrap">
                <label htmlFor="pages" className="label">Coins on page</label>
                <select name="select" id="pages" defaultValue={currentPerPage} onChange={(e) => props.onSelect(e.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={props.onClickNext}>Next</button>
        </div>
    );
};

export default Pagination;