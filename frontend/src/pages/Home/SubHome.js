import React, { useState, useEffect } from "react";
import { getProducts } from "../../helpers/userFetch";
import SubCard from "./SubCard";
import popular from "../../assets/nature.svg";

const SubHome = () => {
  const [productsBySold, setProductBySold] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProductsBySold = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySold();
  }, []);

  const showError = () => error && <h2>Fail to load!</h2>;

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <section class="movies">
      <div class="section-header center">
        <h4 class="movies__header text--white">Latest Books</h4>
        <a class="movies__browse text-boold text--gray">Browse all </a>
      </div>

      <div className="movies__main center d--flex jc--start flex--wrap">
        {productsByArrival.slice(0, 8).map((product, i) => (
          <SubCard key={i} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SubHome;
