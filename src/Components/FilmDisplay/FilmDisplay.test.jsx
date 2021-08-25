import React from "react";
import { shallow } from "enzyme";
import {
  findByTestAttr,
  wrapperRendered,
  wrapperNotRendered,
} from "../../utils/testUtils";

import { FilmDisplay } from "./";

describe("FilmDisplay", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<FilmDisplay />);
  });

  describe("render", () => {
    test("renders without issue", () => {
      expect(wrapper.length).toBe(1);
    });

    test("component wrapper renders", () =>
      wrapperRendered(wrapper, "wrapper"));
    test("image display renders", () =>
      wrapperRendered(wrapper, "image-display"));
    describe("image display children", () => {
      const { useState } = React;
      let imageDisplayWrapper;

      beforeEach(() => {
        imageDisplayWrapper = findByTestAttr(wrapper, "image-display");
      });

      afterEach(() => {
        jest.clearAllMocks();
        React["useState"] = useState;
      });

      test("search and search icon render inside image by default", () => {
        const searchWrapper = findByTestAttr(imageDisplayWrapper, "search");
        expect(searchWrapper.length).toBe(1);
        wrapperRendered(searchWrapper, "search-icon");
      });

      test("image does NOT render by default", () =>
        wrapperNotRendered(imageDisplayWrapper, "image"));

      test("search does NOT render and image DOES if image state is not null", () => {
        const useStateMock = jest.fn(() => [true, () => {}]);
        React["useState"] = useStateMock;
        wrapper = shallow(<FilmDisplay />);
        imageDisplayWrapper = findByTestAttr(wrapper, "image-display");
        wrapperNotRendered(imageDisplayWrapper, "search");
        wrapperRendered(imageDisplayWrapper, "image");
      });
    });
    test("modal renders", () => wrapperRendered(wrapper, "modal"));
  });
});
