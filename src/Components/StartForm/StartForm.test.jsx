import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { shallow } from "enzyme";
import {
  checkProps,
  findByTestAttr,
  wrapperRendered,
} from "../../utils/testUtils";

import StartForm from "./StartForm";

describe("StartForm", () => {
  const setup = (props) => shallow(<StartForm {...props} />);
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  describe("render", () => {
    test("no error is thrown if propTypes are expected types", () =>
      checkProps(StartForm, { onSubmit: () => {} }));
    test("renders correctly", () => {
      expect(wrapper.length).toBe(1);
      wrapperRendered(wrapper, "start-form");
    });

    test("renders title, content and footer", () => {
      wrapperRendered(wrapper, "title");
      wrapperRendered(wrapper, "content");
      wrapperRendered(wrapper, "footer");
    });

    describe("title", () => {
      test("title text is correct", () => {
        const titleWrapper = findByTestAttr(wrapper, "title");
        expect(titleWrapper.text()).toBe("Please Enter Your Details");
      });
    });

    describe("content", () => {
      test("renders label, input and info for api key", () => {
        wrapperRendered(wrapper, "api-key-label");
        wrapperRendered(wrapper, "api-key-input");
        wrapperRendered(wrapper, "api-key-info");
      });

      test("renders label, input and info for cx", () => {
        wrapperRendered(wrapper, "cx-label");
        wrapperRendered(wrapper, "cx-input");
        wrapperRendered(wrapper, "cx-info");
      });
    });

    describe("footer", () => {
      test("renders submit button", () =>
        wrapperRendered(wrapper, "footer-submit"));

      test("submit button does NOT fire onSubmit with empty input", () => {
        const onSubmit = jest.fn();
        const props = { onSubmit };
        wrapper = setup(props);
        const submitButtonWrapper = findByTestAttr(wrapper, "footer-submit");
        submitButtonWrapper.simulate("click");
        expect(onSubmit).not.toHaveBeenCalled();
      });

      test("submit button DOES fire onSubmit with not null inputs", () => {
        const onSubmit = jest.fn();
        const props = { onSubmit };
        const { getByLabelText, getByText } = render(<StartForm {...props} />);

        const apiKeyInput = getByLabelText("Google API Key:");
        const cxInput = getByLabelText("Custom Search Engine ID:");
        const submitButton = getByText("Submit");

        fireEvent.change(apiKeyInput, { target: { value: "test api key" } });
        fireEvent.change(cxInput, { target: { value: "test cx" } });
        fireEvent.click(submitButton);

        expect(onSubmit).toHaveBeenCalledTimes(1);
        cleanup();
      });
    });
  });
});
