import React from "react";
import { shallow } from "enzyme";
import { CartItem } from "./cart-item.component";

describe("CartItem component", () => {
  const mockItems = {
    imageUrl: "www.testImage.com",
    price: 10,
    name: "hats",
    quantity: 2,
  };
  it("should render CartItem component", () => {
    expect(shallow(<CartItem item={mockItems} />)).toMatchSnapshot();
  });
});
