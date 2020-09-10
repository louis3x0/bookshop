import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (categoryId) => () => {
    const currentCategoryId = checked.indexOf(categoryId);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(categoryId);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return categories.map((category) => (
    <li className="list-unstyled ml-5" key={category._id}>
      <input
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(category._id === -1)}
        onChange={handleToggle(category._id)}
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default Checkbox;
