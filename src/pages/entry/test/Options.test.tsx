import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  act(() => {
    render(<Options optionType="scoops" />);
  });

  const scoopImages = (await screen.findAllByRole("img", {
    name: /scoop$/i,
  })) as HTMLImageElement[];
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from the server", async () => {
  act(() => {
    render(<Options optionType="toppings" />);
  });
  const toppingImages = (await screen.findAllByRole("img", {
    name: /topping$/i,
  })) as HTMLImageElement[];
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});