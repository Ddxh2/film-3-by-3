import React from "react";
import { shallow } from "enzyme";
import {
  checkProps,
  findByTestAttr,
  wrapperRendered,
  wrapperNotRendered,
} from "../../utils/testUtils";

import { Pagination } from "./";

describe("Pagination", () => {
  const defaultProps = { stepSize: 10, currNum: 1 };
  const setup = (props) => shallow(<Pagination {...defaultProps} {...props} />);

  let wrapper;

  describe("render", () => {
    beforeEach(() => {
      wrapper = setup();
    });
    test("no error if propTypes are expected types", () => {
      const expectedProps = {
        ...defaultProps,
        onChange: () => {},
        showNext: false,
      };
      checkProps(Pagination, expectedProps);
    });
    test("renders with default props", () => {
      expect(wrapper.length).toBe(1);
      wrapperRendered(wrapper, "wrapper");
    });

    test("render back and forward buttons wrapper", () => {
      wrapperRendered(wrapper, "back-buttons");
      wrapperRendered(wrapper, "forward-buttons");
    });

    test("renders full back button in back button wrapper ONLY when currNum > stepSize + 1", () => {
      let backButtonWrapper = findByTestAttr(wrapper, "back-buttons");
      wrapperNotRendered(backButtonWrapper, "full-back-button");
      wrapper = setup({ stepSize: 2, currNum: 4 });
      backButtonWrapper = findByTestAttr(wrapper, "back-buttons");
      wrapperRendered(backButtonWrapper, "full-back-button");
    });

    test("renders single back button in back button wrapper ONLY when currNum !== 1", () => {
      let backButtonWrapper = findByTestAttr(wrapper, "back-buttons");
      wrapperNotRendered(backButtonWrapper, "single-back-button");
      wrapper = setup({ stepSize: 10, currNum: 2 });
      backButtonWrapper = findByTestAttr(wrapper, "back-buttons");
      wrapperRendered(backButtonWrapper, "single-back-button");
    });

    test("renders single forward button in forward button wrapper ONLY when showNext === true", () => {
      let forwardButtonWrapper = findByTestAttr(wrapper, "forward-buttons");
      wrapperNotRendered(forwardButtonWrapper, "single-forward-button");
      wrapper = setup({ showNext: true });
      forwardButtonWrapper = findByTestAttr(wrapper, "forward-buttons");
      wrapperRendered(forwardButtonWrapper, "single-forward-button");
    });
  });

  describe("onChange", () => {
    let onChange;
    let onChangeProps = { stepSize: 1, currNum: 5, showNext: true };
    beforeEach(() => {
      onChange = jest.fn();
      wrapper = setup({ ...onChangeProps, onChange });
    });

    const testOnChangeCallback = (testAttr, expectedVal) => {
      expect(onChange).toHaveBeenCalledTimes(0);
      findByTestAttr(wrapper, testAttr).simulate("click");
      expect(onChange).toHaveBeenLastCalledWith(expectedVal);
    };

    test("full back button calls onChange with 1", () =>
      testOnChangeCallback("full-back-button", 1));

    test("single back button calls onChange with 4", () =>
      testOnChangeCallback("single-back-button", 4));

    test("single forward button calls onChange with 6", () =>
      testOnChangeCallback("single-forward-button", 6));
  });
});
