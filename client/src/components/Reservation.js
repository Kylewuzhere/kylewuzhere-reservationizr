import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`http://localhost:5000/reservations/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setReservation(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{reservation.restaurantName}</h1>
      <p>{formatDate(reservation.date)}</p>
      <p>
        <strong>Party size:</strong>
        {reservation.partySize}
      </p>
    </>
  );
};

export default Reservation;
