import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
//create custom hook to check whether we are inside a provider

export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within a useOrderDetailsProvider "
    );
  }
  return context;
}
type orderType = "scoops" | "toppings";

function calculateSubtotal(orderType: orderType, optionsCounts: any) {
  let optionCount = 0;
  for (const count of optionsCounts[optionCount].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
}

export function OrderDetailsProvider(props: any) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map<string, any>(),
    toppings: new Map<string, any>(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCount);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCount);
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(scoopsSubtotal + toppingsSubtotal),
    });
  }, [optionsCount]);

  const value = useMemo(() => {
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: orderType
    ) {
      const newOptionsCount = { ...optionsCount };
      const optionsCountMap = optionsCount[optionType];
      optionsCountMap.set(itemName, parseInt(newItemCount));

      setOptionsCount(newOptionsCount);
    }
    return [{ ...optionsCount, totals }, updateItemCount];
  }, [optionsCount, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
