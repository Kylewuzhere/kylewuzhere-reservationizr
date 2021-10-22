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
        {restaurantList.map(({ description, id, image, name }) => {
          return (
            <li className="restaurant grid" key={id}>
              <img src={image} alt={name} className="restaurant-img" />
              <div className="text-cont">
                <h2 className="restaurant-name">{name}</h2>
                <p className="restaurant-desc">{description}</p>
                <Link className="btn-general" to={`/restaurants/${id}/reserve`}>
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
