import React from "react";
import { shallow } from "enzyme";
import {
  checkProps,
  findByTestAttr,
  wrapperRendered,
} from "../../utils/testUtils";

import Info from "./Info";

describe("Info", () => {
  const setup = () =>
    shallow(
      <Info>
        <div data-test='child'>Test Text</div>
      </Info>
    );

  describe("render", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });
    test("no error if propTypes are expected types", () => {
      const expectedProps = { offSet: 1 };
      checkProps(Info, expectedProps);
    });
    test("correctly renders info icon", () =>
      wrapperRendered(wrapper, "info-icon"));

    describe("tooltip", () => {
      test("correcty renders the tooltip wrapper", () =>
        wrapperRendered(wrapper, "tooltip-wrapper"));

      test("correctly renders the tooltip body", () =>
        wrapperRendered(wrapper, "tooltip-body"));

      test("correctly renders the tooltip arrow", () =>
        wrapperRendered(wrapper, "tooltip-body"));

      test("correctly renders child div in tooltip body and text", () => {
        const tooltipBodyWrapper = findByTestAttr(wrapper, "tooltip-body");
        const childWrapper = findByTestAttr(tooltipBodyWrapper, "child");
        expect(childWrapper.length).toBe(1);
        expect(childWrapper.text()).toBe("Test Text");
      });
    });
  });
});
