import React from "react";
import './pagination.css';
import Select from "../select";
import { selectCoinsPerPage } from "../../modules/helpers/data";

const Pagination = (props) => {
    const disabled = props.currentOptions.page <= 1 ? 'disabled' : null;
    const currentPerPage = props.currentOptions.per_page;

    return (
        <div className="pagination d-flex justify-content-between my-3">
            <button className="btn btn-primary" onClick={props.onClickPrev} disabled={disabled}>Prev</button>
            <Select label="Coins per page" defaultValue={ currentPerPage } 
                                            options={ selectCoinsPerPage } 
                                            onSelect={ props.onSelect } />
            <button className="btn btn-primary" onClick={props.onClickNext}>Next</button>
        </div>
    );
};

export default Pagination;