import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constants";
import { formatCurrency } from "../utilities";

//create custom hook to check whether we are inside a provider
const zeroCurrency = formatCurrency(0);
// const defaultState = {
//   optionsCount: {
//     scoops: new Map<string, any>(),
//     toppings: new Map<string, any>(),
//   },
//   totals: {
//     scoops: zeroCurrency,
//     toppings: zeroCurrency,
//     grandTotal: zeroCurrency,
//   },
// };
const OrderDetails = createContext();
export function useOrderDetails() {
  const context = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within a OrderDetailsProvider "
    );
  }
  return context;
}
type orderType = "scoops" | "toppings";

function calculateSubtotal(orderType: orderType, optionsCounts: any) {
  let optionCount = 0;
  for (const count of optionsCounts[orderType].values()) {
    optionCount += count;
  }
  return optionCount * pricePerItem[orderType];
}

export function OrderDetailsProvider(props: any) {
  const [optionsCount, setOptionsCount] = useState({
    scoops: new Map<string, any>(),
    toppings: new Map<string, any>(),
  });

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionsCount);
    const toppingsSubtotal = calculateSubtotal("toppings", optionsCount);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
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
    function resetOrder() {
      setOptionsCount({
        scoops: new Map(),
        toppings: new Map(),
      });
    }
    return [{ ...optionsCount, totals }, updateItemCount, resetOrder];
  }, [optionsCount, totals]);
  return <OrderDetails.Provider value={value} {...props} />;
}
