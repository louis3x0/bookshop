import React, { useState, useEffect } from "react";
import { getCategories } from "../../helpers/admin";
import { getProductsBySearch } from "../../helpers/userFetch";
import Card from "../../pages/Home/Card";
import { result } from "lodash";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  }, []);

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    console.log(`search:${search}`, `category:${category}`);
    if (search) {
      getProductsBySearch({
        search: search || undefined,
        category: category,
      }).then((response) => {
        if (response.error) {
          console.log(response.error);
        } else {
          setData({ ...data, results: response, searched: true });
        }
      });
    }
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products with "${search}" in the name.`;
    }
    if (searched && results.length < 1) {
      return `No product found!`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="mt-3 text-center">
        <h2 className="mt-3 mb-3">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="m-3">
      {/* Search Form */}
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange("category")}>
                <option value="All">All</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="search"
              className="form-control"
              onChange={handleChange("search")}
              placeholder="Enter name"
            />
          </div>
          <div className="btn input-group-append" style={{ border: "none" }}>
            <button className="btn btn-primary">Search</button>
          </div>
        </span>
      </form>
      {/* Search  Results*/}
      {searchedProducts(results)}
    </div>
  );
};

export default Search;
