import React from "react";
import { shallow } from "enzyme";
import { CollectionPreview } from "./collection-preview.component";

describe("CollectionPreview component", () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  const mockRouteName = "hats";
  beforeEach(() => {
    mockHistory = {
      push: jest.fn(),
    };
    mockMatch = {
      path: jest.fn(),
    };
    const mockProps = {
      title: "hats",
      items: [],
      history: mockHistory,
      match: mockMatch,
      routeName: mockRouteName,
    };
    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  it("should render CollectionPreview", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should call history.push with the right string when TitleContainer clicked", () => {
    wrapper.find("TitleContainer").simulate("click");
    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.path}/${mockRouteName}`
    );
  });
});
