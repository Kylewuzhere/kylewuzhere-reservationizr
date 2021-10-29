import "./RestaurantList.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`);

      const data = await res.json();
      setRestaurantList(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
