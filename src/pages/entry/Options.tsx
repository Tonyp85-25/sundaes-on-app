import axios from "axios";
import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { IceItemProps } from "../../types/props";
import ScoopOption from "./ScoopOptions";
import ToppingOption from "./ToppingOption";

interface OptionsProps {
  optionType: "scoops" | "toppings";
}
export default function Options(props: OptionsProps) {
  const { optionType } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO
      });
  }, [optionType]);

  //TODO replace null with ToppingOption
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item: IceItemProps) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));
  return <Row>{optionItems}</Row>;
}
