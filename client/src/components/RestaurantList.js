import "./RestaurantList.css";
import React, { useState, useEffect } from "react";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:5000/restaurants`);

      const data = await res.json();
      setRestaurantList(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Restaurants</h1>
      <div className="restaurants-container">
        {restaurantList.map((res) => {
          return (
            <li key={res.id}>
              <img src={res.image} alt={res.name} />
              <h2 className="restaurant-name">{res.name}</h2>
              <p className="restaurant-description">{res.description}</p>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantList;
