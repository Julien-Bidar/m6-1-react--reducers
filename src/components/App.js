import React, { useEffect } from "react";
import { useSeat } from "./SeatContext";
import TicketWidget from "./TicketWidget";

import GlobalStyles from "./GlobalStyles";
import PurchaseModal from "./PurchaseModal";

function App() {
  // context
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = useSeat();

  // api call through useEffect
  const fetchSeatAvailable = async () => {
    try {
      let data = await fetch("/api/seat-availability");
      data = await data.json();
      receiveSeatInfoFromServer(data);
    } catch (err) {
      console.log({ error: err });
    }
  };

  useEffect(() => {
    fetchSeatAvailable();
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />
    </>
  );
}

export default App;
