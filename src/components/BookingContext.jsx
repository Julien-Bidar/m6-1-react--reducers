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
    case "purchase-ticket-request": {
      return {
        ...state,
        error: null,
        status: "awaiting-response",
      };
    }

    case "purchase-success": {
      return {
        ...state,
        error: null,
        status: "purchased",
        price: null,
      };
    }

    case "purchase-failure":
      return {
        ...state,
        error: action.message,
        status: "error",
      };

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

  const bookingRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseSuccess = () => {
    dispatch({
      type: "purchase-success",
    });
  };

  const purchaseFailure = () => {
    dispatch({
      type: "purchase-failure",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        action: {
          beginBookingProcess,
          cancelBookingProcess,
          bookingRequest,
          purchaseSuccess,
          purchaseFailure,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
