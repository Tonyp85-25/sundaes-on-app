import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

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

export function useOrderDetailsProvider(props: any) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map<string, any>(),
    toppings: new Map<string, any>(),
  });

  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCount);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCount);
    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal: scoopsSubtotal + toppingsSubtotal,
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
