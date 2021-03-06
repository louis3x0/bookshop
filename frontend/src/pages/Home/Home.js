import React, { useState, useEffect } from "react";
import { getProducts } from "../../helpers/userFetch";
import Card from "./Card";
import popular from "../../assets/nature.svg";

const Home = () => {
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
    <section class="pos--rel hero">
      <div class="text--center hero__head">
        <h1 class="hero__title text--white">
          Download BSH books: HD smallest size
        </h1>
        <p class="hero__subtitle">
          Welcome to the official <b>BookShop</b> website. Here you will be able
          to browse and download books for free. Only here: Book Shop PDF.
        </p>
      </div>

      <div className="hero__popular">
        <h2 class="hero__popular-header">
          <img src={popular} class="star" alt="" />
          <span class="hero__text">Popular Downloads</span>
        </h2>
        <div class="hero__cards bordered--top brdr--clear">
          {productsByArrival.slice(0, 4).map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
