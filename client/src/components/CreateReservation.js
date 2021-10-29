import DatePicker from "react-datepicker";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateReservation.css";

const CreateReservation = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants/${restaurantId}`
      );

      const data = await res.json();
      setRestaurant(data);
      setIsLoading(false);
    };
    fetchData();
  }, [restaurantId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      partySize: partySize,
      date: date,
      restaurantName: restaurant.name,
    };

    const accessToken = await getAccessTokenSilently();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      history.push("/");
    }
  };

  if (isError) {
    return (
      <>
        <p className="no-reserve">
          {errorStatus} Error creating a reservation.
        </p>
        <p>Party size must be greater than or equal to one.</p>
        <p>Date must be greater than or equal to the current date.</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1>Reserve {restaurant.name}</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="partySize">Number of guests</label>
            <input
              type="number"
              id="partySize"
              min="0"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="date">Date</label>
            <DatePicker
              id="date"
              selected={date}
              onChange={(e) => setDate(e)}
              showTimeSelect
              dateFormat="MM/dd/yyyy, h:mm aa"
              required
            />
          </div>

          <button className="btn-general">Submit</button>
        </form>
      </div>
    </>
  );
};

export default CreateReservation;
