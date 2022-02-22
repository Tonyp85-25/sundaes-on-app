import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import { act } from "react-dom/test-utils";
import Options from "../Options";

test("displays image for each scoop otpion from the server", async () => {
  act(() => {
    render(<Options optionType="scoops" />);
  });

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element: HTMLImageElement) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
