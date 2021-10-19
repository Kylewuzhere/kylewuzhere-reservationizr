import "./RestaurantList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <div className="restaurant-cont">
        {restaurantList.map((res) => {
          return (
            <li className="restaurant grid" key={res.id}>
              <img src={res.image} alt={res.name} className="restaurant-img" />
              <div className="text-cont">
                <h2 className="restaurant-name">{res.name}</h2>
                <p className="restaurant-desc">{res.description}</p>
                <Link
                  className="link-reserve"
                  to={`/restaurants/${res.id}/reserve`}
                >
                  Reserve now &rarr;
                </Link>
              </div>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantList;
