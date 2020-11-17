import React from "react";
import styled from "styled-components";
import seatAvailable from "../assets/seat-available.svg";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useBooking } from "./BookingContext";

const Seat = (props) => {
  const { rowName, seatIndex, price, status, seatId } = props;
  const {
    action: { beginBookingProcess },
  } = useBooking();

  return (
    <div>
      {status === "available" ? (
        <Tippy content={`Row ${rowName}, Seat ${seatIndex + 1} - $${price}`}>
          <button onClick={() => beginBookingProcess(seatId, price)}>
            <img src={seatAvailable} alt="seat" />
          </button>
        </Tippy>
      ) : (
        <Tippy content="this seat is booked">
          <button disabled={true}>
            <img
              src={seatAvailable}
              alt="seat"
              style={{ filter: "grayscale(100%)" }}
            />
          </button>
        </Tippy>
      )}
    </div>
  );
};

export default Seat;
