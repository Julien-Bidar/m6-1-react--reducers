import React, { useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import { useBooking } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price },
    action: { cancelBookingProcess },
  } = useBooking();

  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");

  console.log({ creditCard: creditCard, expiration: expiration });

  let row;
  let seat;
  if (typeof selectedSeatId === "string") {
    row = selectedSeatId.split("-")[0];
    seat = selectedSeatId.split("-")[1];
  }

  //handles
  const handleCreditCard = (e) => {
    setCreditCard(e.target.value);
  };
  const handleExpiration = (e) => {
    setExpiration(e.target.value);
  };

  return (
    <>
      <Dialog
        open={selectedSeatId !== null}
        onClose={cancelBookingProcess}
        aria-labelledby="purchase form"
      >
        <DialogTitle>Purchase ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are purchasing 1 ticket for the price of ${price}
          </DialogContentText>
          <DialogContentText>
            <div>
              <InfoWrap>
                <Span>Row</Span>
                <Span>Seat</Span>
                <Span>Price</Span>
              </InfoWrap>
              <hr />
              <InfoWrap>
                <SpanInfo>{row}</SpanInfo>
                <SpanInfo>{seat}</SpanInfo>
                <SpanInfo>${price}</SpanInfo>
              </InfoWrap>
              <hr />
            </div>
          </DialogContentText>
          <DialogContentText>Enter payment details</DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => handleCreditCard(e)}
            margin="dense"
            id="creditCard"
            label="Credit Card information"
            type="text"
            fullWidth
          />
          <TextField
            onChange={(e) => handleExpiration(e)}
            margin="dense"
            id="expirationDate"
            label="Expiration date"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">Purchase</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const InfoWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Span = styled.span`
  margin: 7px;
  font-weight: bold;
`;

const SpanInfo = styled.span`
  margin: 0 10px;
  font-weight: bold;
  padding: 7px;
`;

export default PurchaseModal;
