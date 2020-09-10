import React from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const SubCard = ({ product }) => {
  return (
    <div class="card-home released">
      <Images item={product} />

      <a href="" class="title">
        {product.name}
      </a>
      <span className="text--gray year">{product.description}</span>
    </div>
  );
};

export default SubCard;
