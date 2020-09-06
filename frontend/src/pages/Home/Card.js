import React from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const Card = ({ product }) => {
  return (
    <div class="card">
      <Images item={product} />
      <div>
        <h5 class="card-title">{product.name}</h5>
        <p className="card-text">{product.description.substring(0, 50)}</p>
      </div>
    </div>
  );
};

export default Card;
