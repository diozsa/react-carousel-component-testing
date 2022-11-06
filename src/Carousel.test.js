import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders without crashing", () => {
  render(<Carousel />)
});

//snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("works when you click the left arrow", () => {
  const { queryByTestId, queryByAltText, debug } = render(<Carousel />);
 
  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  //move backwards to first image
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //expect the first image to show, not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash"))
    .toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash"))
    .not.toBeInTheDocument();
});


it("hides left arrow on the first image", () => {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toHaveClass('hidden');
})

it("hides right arrow on the last image", () => {
  const { queryByTestId } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass('hidden');
})