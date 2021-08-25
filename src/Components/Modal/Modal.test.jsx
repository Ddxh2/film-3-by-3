import React from "react";
import { shallow } from "enzyme";
import { fireEvent, render, cleanup } from "@testing-library/react";
import {
  checkProps,
  findByTestAttr,
  wrapperRendered,
  wrapperNotRendered,
} from "../../utils/testUtils";

import { Modal } from "./";

describe("Modal", () => {
  const defaultProps = { title: "Title Text", isOpen: true };
  const setup = (props) =>
    shallow(
      <Modal {...defaultProps} {...props}>
        <div data-test='child'>Test Child</div>
      </Modal>
    );
  let wrapper;

  beforeEach(() => (wrapper = setup()));
  describe("render", () => {
    test("no errors if propTypes are expected types", () => {
      const expectedProps = {
        ...defaultProps,
        onClose: () => {},
      };
      checkProps(Modal, expectedProps);
    });

    test("renders wiithout issue with default props", () =>
      expect(wrapper.length).toBe(1));

    test("renders overlay with no errors with default props", () =>
      wrapperRendered(wrapper, "overlay"));

    test("modal wrapper ONLY renders if isOpen === true", () => {
      wrapperRendered(wrapper, "modal-wrapper");
      wrapper = setup({ isOpen: false });
      wrapperNotRendered(wrapper, "modal-wrapper");
    });

    test("Close Button, Modal Header and Modal Content all render inside modal wrapper", () => {
      const modalWrapper = findByTestAttr(wrapper, "modal-wrapper");
      wrapperRendered(modalWrapper, "close-button");
      wrapperRendered(modalWrapper, "modal-header");
      wrapperRendered(modalWrapper, "modal-content");
    });

    test("close button renders with text correctly", () => {
      const closeButtonWrapper = findByTestAttr(wrapper, "close-button");
      expect(closeButtonWrapper.text()).toBe("x");
    });

    test("modal title renders inside modal header with title prop as text", () => {
      const modalHeaderWrapper = findByTestAttr(wrapper, "modal-header");
      const modalTitleWrapper = findByTestAttr(
        modalHeaderWrapper,
        "modal-title"
      );
      expect(modalTitleWrapper.length).toBe(1);
      expect(modalTitleWrapper.text()).toBe(defaultProps.title);
    });

    test("renders modal content with provided child component", () => {
      const modalContentWrapper = findByTestAttr(wrapper, "modal-content");
      const childComponentWrapper = findByTestAttr(
        modalContentWrapper,
        "child"
      );
      expect(childComponentWrapper.length).toBe(1);
      expect(childComponentWrapper.text()).toBe("Test Child");
    });
  });

  describe("CloseButton", () => {
    const { useState } = React;
    afterEach(() => {
      jest.clearAllMocks();
      React["useState"] = useState;
      cleanup();
    });
    test("CloseButton correctly sets modalOpen state to false", () => {
      const setStateMock = jest.fn();
      const useStateMock = jest.fn((init) => [init, setStateMock]);
      React["useState"] = useStateMock;
      wrapper = setup();
      expect(useStateMock).toHaveBeenCalledTimes(1);
      expect(setStateMock).toHaveBeenCalledTimes(0);
      findByTestAttr(wrapper, "close-button").simulate("click");
      expect(setStateMock).toHaveBeenCalledTimes(1);
      expect(setStateMock).toHaveBeenCalledWith(false);
    });

    test("CloseButton correctly calls onClose prop", () => {
      const onClose = jest.fn();
      const { getByTitle } = render(
        <Modal {...{ ...defaultProps, onClose }} />
      );
      expect(onClose).not.toHaveBeenCalled();
      fireEvent.click(getByTitle("close-button"));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("useEffect", () => {
    test("useEffect hook firing correctly on render", () => {
      const useEffectSpy = jest.spyOn(React, "useEffect");
      render(<Modal {...defaultProps} />);
      expect(useEffectSpy).toHaveBeenCalled();
    });
  });
});
