import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";

const ReservationList = () => {
  const [reservationList, setReservationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:5000/reservations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setReservationList(data);
      setIsLoading(false);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Upcoming reservations</h1>
      <div className="reserve-cont">
        {reservationList.map(({ id, restaurantName, date }) => {
          return (
            <li className="reservation" key={id}>
              <strong>{restaurantName}</strong>
              <p className="reserve-date">{formatDate(date)}</p>
              <Link className="reserve-link" to={`reservations/${id}`}>
                View Details &rarr;
              </Link>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default ReservationList;
