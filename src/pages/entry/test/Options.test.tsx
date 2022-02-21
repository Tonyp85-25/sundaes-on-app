import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import Options from "../Options";

test("displays image for each scoop otpion from the server", () => {
  render(<Options optionType="scoops" />);
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
