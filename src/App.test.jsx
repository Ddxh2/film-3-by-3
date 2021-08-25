import React from "react";
import { shallow } from "enzyme";
import {
  findByTestAttr,
  wrapperRendered,
  wrapperNotRendered,
} from "./utils/testUtils";

import App from "./App.jsx";

describe("App", () => {
  const setup = () => shallow(<App />);
  let wrapper;
  beforeEach(() => (wrapper = setup()));

  describe("render", () => {
    test("renders without issue", () => expect(wrapper.length).toBe(1));
    test("renders app wrapper without issue", () =>
      wrapperRendered(wrapper, "app-wrapper"));

    describe("customSearchContext state null", () => {
      test("StartForm rendered in app wrapper", () => {
        const appWrapper = findByTestAttr(wrapper, "app-wrapper");
        wrapperRendered(appWrapper, "start-form");
      });

      test("film grid NOT rendered in app wrapper", () => {
        const appWrapper = findByTestAttr(wrapper, "app-wrapper");
        wrapperNotRendered(appWrapper, "film-grid");
      });
    });

    describe("customSearchContext state NOT null", () => {
      const { useState } = React;

      beforeEach(() => {
        const useStateMock = jest.fn(() => [{}, () => {}]);
        React["useState"] = useStateMock;
        wrapper = setup();
        console.log(wrapper.debug());
      });

      afterEach(() => {
        jest.clearAllMocks();
        React["useState"] = useState;
      });

      test("StartForm NOT rendered in app wrapper", () => {
        const appWrapper = findByTestAttr(wrapper, "app-wrapper");
        wrapperNotRendered(appWrapper, "start-form");
      });

      test("film grid rendered in app wrapper", () => {
        const appWrapper = findByTestAttr(wrapper, "app-wrapper");
        wrapperRendered(appWrapper, "film-grid");
      });
    });
  });
});
