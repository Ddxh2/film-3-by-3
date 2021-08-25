import React from "react";
import { shallow } from "enzyme";
import {
  checkProps,
  wrapperRendered,
  wrapperNotRendered,
} from "../../utils/testUtils";
import { render, cleanup } from "@testing-library/react";

import { Chevron } from "./";

describe("Chevron", () => {
  const defaultProps = { isDouble: false, rotate: 270 };
  const setup = (props) => shallow(<Chevron {...props} />);

  let wrapper;
  beforeEach(() => {
    wrapper = setup(defaultProps);
  });

  describe("render", () => {
    test("no errors if propTypes are expected types", () =>
      checkProps(Chevron, defaultProps));
    test("renders with default props", () => expect(wrapper.length).toBe(1));
    test("renders chevron wrapper with default props", () =>
      wrapperRendered(wrapper, "chevron-wrapper"));
    test("renders chevron before and after with default props", () => {
      wrapperRendered(wrapper, "chevron-before");
      wrapperRendered(wrapper, "chevron-after");
    });
    test("renders second chevron before and after ONLY if isDouble is true", () => {
      wrapperNotRendered(wrapper, "second-chevron-before");
      wrapperNotRendered(wrapper, "second-chevron-after");
      wrapper = setup({ isDouble: true, rotate: 270 });
      wrapperRendered(wrapper, "second-chevron-before");
      wrapperRendered(wrapper, "second-chevron-after");
    });
    test("changing rotate prop doesn't affect rendering", () => {
      render(<Chevron {...defaultProps} />);
      cleanup();
      render(<Chevron {...{ isDouble: true, rotate: 90 }} />);
      cleanup();
    });
  });
});
