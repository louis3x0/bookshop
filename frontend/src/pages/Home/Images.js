import React from "react";

const Images = ({ item }) => {
  return (
    <img
      src={`${process.env.REACT_APP_API_URL}/product/photo/${item._id}`}
      alt={item.name}
      className="card-img-top img-fluid mt-5"
    />
  );
};

export default Images;
