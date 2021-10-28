import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./ReservationList.css";
import { formatDate } from "../utils/formatDate";

const ReservationList = () => {
  const [reservationList, setReservationList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
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

      if (!response.ok) {
        setIsError(true);
      }

      const data = await response.json();
      setReservationList(data);
      setIsLoading(false);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <>
        <p className="reservation-error">
          Sorry! We can't find that reservation
        </p>
      </>
    );
  }

  if (reservationList.length === 0) {
    return (
      <>
        <p>You don't have any reservations.</p>
        <Link className="no-reservations-link" to={"/"}>
          View the restaurants
        </Link>
      </>
    );
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
              <Link className="reservations-link" to={`reservations/${id}`}>
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
