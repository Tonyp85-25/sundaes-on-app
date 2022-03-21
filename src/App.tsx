import React, { useState } from "react";
import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/orderConfirmation";
import { OrderComponent, OrderPhase } from "./types";

function App() {
  const [orderPhase, setOrderPhase] = useState(OrderPhase.inProgress);

  let Component: OrderComponent = OrderEntry;
  switch (orderPhase) {
    case OrderPhase.inProgress:
      Component = OrderEntry;
      break;
    case OrderPhase.review:
      Component = OrderSummary;
      break;
    case OrderPhase.completed:
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
