import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { useSeat } from "./SeatContext";
import { colors } from "@material-ui/core";
import Seat from "./Seat";

const TicketWidget = () => {
  // use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = useSeat();

  return (
    <Wrapper>
      {/* implement the loading spinner <CircularProgress /> with the hasLoaded flag */}
      {!hasLoaded && <CircularProgress color="secondary" />}
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);
        return (
          <Row key={rowIndex}>
            {/* <RowLabel>Row {rowName}</RowLabel> */}
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];
              return (
                <SeatWrapper key={seatId}>
                  <Seat
                    seatId={seatId}
                    rowName={rowName}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seat.price}
                    status={seat.isBooked ? "unavailable" : "available"}
                  />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
