import { useOrderDetails } from "../../contexts/OrderDetails";
import { OrderProps } from "../../types";
import SummaryForm from "./SummaryForm";

export default function OrderSummary(props:OrderProps) {
  const {setOrderPhase} =props
  const [orderDetails] =useOrderDetails()
  const scoopArray = Array.from(orderDetails.scoops.entries())
  const scoopList  = scoopArray.map(([key,value])=>(
    <li key={key}>
      {value} {key}
    </li>
  ))

  const toppingsArray = Array.from(orderDetails.toppings.entries())
  const toppingsList = toppingsArray.map((key)=><li key={key}>{key}</li>)
  return (<div>
    <h1>Order summary</h1>
    <h2>Scoops: {orderDetails.totals.scoops}</h2>
    <ul>{scoopList}</ul>
    <h2>
      Toppings: {orderDetails.totals.toppings}
    </h2>
    <ul>{toppingsList}</ul>
    <SummaryForm setOrderPhase={setOrderPhase}/>
  </div>
}
