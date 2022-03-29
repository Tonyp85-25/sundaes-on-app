import { SyntheticEvent } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { OrderPhase, OrderProps } from "../../types";
import Options from "./Options";

export default function OrderEntry(props: OrderProps) {
  const { setOrderPhase } = props;
  const [orderDetails] = useOrderDetails();
  function handleClick(event: SyntheticEvent) {
    //event.preventDefault();
    setOrderPhase(OrderPhase.review);
  }
  return (
    <div>
      <h1>Design your sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button variant="primary" onClick={handleClick}>
        Order Sundae!
      </Button>
    </div>
  );
}
