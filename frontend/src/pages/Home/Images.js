import React from "react";

const Images = ({ item }) => {
  return (
    <div class="image-container">
      <img
        src={`${process.env.REACT_APP_API_URL}/product/photo/${item._id}`}
        alt={item.name}
        className="hero__card-img"
      />
      <div class="overlay">
        <div class="info">
          <button class="button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Images;
