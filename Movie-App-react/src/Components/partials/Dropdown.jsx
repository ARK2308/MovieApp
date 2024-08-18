import React from "react";

const Dropdown = ({ title, options = [], func }) => {
  return (
    <div className="select">
      <select defaultValue="0" onChange={func} name="format" id="format">
        <option value="0" disabled>
          {title}
        </option>
        {options.length > 0 ? (
          options.map((option, i) => (
            <option key={i} value={option}>
              {option.toUpperCase()}
            </option>
          ))
        ) : (
          <option disabled>No options available</option>
        )}
      </select>
    </div>
  );
};

export default Dropdown;
