import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        setIsError(true);
      }

      const data = await response.json();
      setReservation(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <>
        <p className="error">Sorry! We can't find that reservation</p>
        <Link className="btn" to={"/reservations"}>
          &larr; Back to reservations
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="reservation-page">
        <h1 className="reservation-title">{reservation.restaurantName}</h1>
        <p>{formatDate(reservation.date)}</p>
        <p>
          <strong>Party size: </strong>
          {reservation.partySize}
        </p>
      </div>
      <Link className="btn" to={"/reservations"}>
        &larr; Back to reservations
      </Link>
    </>
  );
};

export default Reservation;
