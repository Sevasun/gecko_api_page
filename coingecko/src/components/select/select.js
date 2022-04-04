import React from "react";

const Select = (props) => {
  const id = Date.now();
  const { label, options, defaultValue } = props;
  const createOptions = options.map((opt) => {
    return <option key={ opt.value } value={ opt.value }>{ opt.text }</option>
  });

  return (
    <div className="select-wrap">
      <label htmlFor={id} className="label">{ label }</label>
      <select
        id={id}
        defaultValue={defaultValue}
        onChange={(e) => props.onSelect(e.target.value)}
      >
        { createOptions }
      </select>
    </div>
  );
};

export default Select;
