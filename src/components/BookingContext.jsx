import React, { createContext, useContext, useReducer } from "react";

const BookingContext = createContext(null);
export const useBooking = () => useContext(BookingContext);

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seat,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      return {
        ...initialState,
      };
    }
    default:
      throw new Error(`unrecognized action: ${action.type}`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log({ state: state });

  const beginBookingProcess = (seatId, seatPrice) => {
    dispatch({
      type: "begin-booking-process",
      seat: seatId,
      price: seatPrice,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({ type: "cancel-booking-process" });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        action: {
          beginBookingProcess,
          cancelBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
