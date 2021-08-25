import React from "react";
import { shallow } from "enzyme";
import { render, cleanup } from "@testing-library/react";
import {
  findByTestAttr,
  checkProps,
  wrapperRendered,
  wrapperNotRendered,
} from "../../utils/testUtils";

import { GoogleImageSearch } from "./";

jest.mock("axios");

describe("GoogleImageSearch", () => {
  const setup = (props) => shallow(<GoogleImageSearch {...props} />);
  let wrapper;
  beforeEach(() => (wrapper = setup()));
  describe("render", () => {
    test("no errors if propTypes are expected types", () => {
      const expectedProps = { onSelect: () => {} };
      checkProps(GoogleImageSearch, expectedProps);
    });

    test("renders without issue", () => {
      render(<GoogleImageSearch />);
      expect(wrapper.length).toBe(1);
    });

    test("renders component wrapper", () =>
      wrapperRendered(wrapper, "wrapper"));

    test("renders search, content and footer wrappers inside component wrapper", () => {
      const componentWrapper = findByTestAttr(wrapper, "wrapper");
      wrapperRendered(componentWrapper, "search-wrapper");
      wrapperRendered(componentWrapper, "content-wrapper");
      wrapperRendered(componentWrapper, "footer-wrapper");
    });

    test("search input and search button render inside search", () => {
      const searchWrapper = findByTestAttr(wrapper, "search-wrapper");
      wrapperRendered(searchWrapper, "search-input");
      const searchButtonWrapper = findByTestAttr(
        searchWrapper,
        "search-button"
      );
      expect(searchButtonWrapper.length).toBe(1);
      expect(searchButtonWrapper.text()).toBe("Search");
    });

    test("content wrapper should be empty by default", () => {
      const contentWrapper = findByTestAttr(wrapper, "content-wrapper");
      expect(contentWrapper.children().length).toBe(0);
    });

    test("footer wrapper should be empty by default", () => {
      const footerWrapper = findByTestAttr(wrapper, "footer-wrapper");
      expect(footerWrapper.children().length).toBe(0);
    });
  });

  describe("event", () => {
    const { useState, useEffect, useRef, useContext } = React;

    const mockReturns = (...rtns) => {
      return rtns.map((val) => (!!val ? [val, () => {}] : val));
    };
    const createUseStateMock = (...rtns) => {
      let counter = 0;
      return jest.fn((init) => {
        counter++;
        return !!rtns[counter - 1] ? rtns[counter - 1] : useState(init);
      });
    };

    afterEach(() => {
      jest.clearAllMocks();
      React["useState"] = useState;
      React["useRef"] = useRef;
      React["useEffect"] = useEffect;
      React["useContext"] = useContext;
    });

    describe("images and errors", () => {
      const mockResponse = { data: { queries: { nextPage: true } } };
      const mockImages = [
        { widthMax: true, src: "./info.png" },
        { widthMax: false, src: "./info.png" },
        { widthMax: true, src: "./info.png" },
      ];
      const mockStartNum = 1;
      const mockError = { toString: () => "error" };

      test("images present in content wrapper if image state is non empty and there is no error", () => {
        const useStateMock = createUseStateMock(
          ...mockReturns(mockResponse, mockImages, mockStartNum)
        );
        React["useState"] = useStateMock;

        wrapper = setup();

        const contentWrapper = findByTestAttr(wrapper, "content-wrapper");

        const imagesWrapper = findByTestAttr(contentWrapper, "image");

        expect(imagesWrapper.length).toBe(3);

        render(<GoogleImageSearch />);

        cleanup();
      });

      test("pagination present if image state is non empty", () => {
        const useStateMock = createUseStateMock(
          ...mockReturns(mockResponse, mockImages, mockStartNum)
        );
        React["useState"] = useStateMock;

        wrapper = setup();

        wrapperRendered(wrapper, "pagination");
      });

      test("images not present regardless of image state if there is an error", () => {
        const useStateMock = createUseStateMock(
          ...mockReturns(mockResponse, mockImages, mockStartNum, mockError)
        );
        React["useState"] = useStateMock;
        wrapper = setup();

        const contentWrapper = findByTestAttr(wrapper, "content-wrapper");

        wrapperNotRendered(contentWrapper, "image");
        expect(contentWrapper.text()).toBe(mockError.toString());
        render(<GoogleImageSearch />);
        cleanup();
      });

      test("clicking images fires onSelect with image", () => {
        const useStateMock = createUseStateMock(
          ...mockReturns(mockResponse, mockImages, mockStartNum)
        );
        React["useState"] = useStateMock;
        const onSelect = jest.fn();

        wrapper = setup({ onSelect });

        const imagesWrapper = findByTestAttr(wrapper, "image");

        imagesWrapper.forEach((imageWrapper, index) => {
          imageWrapper.simulate("click");
          expect(onSelect).toHaveBeenLastCalledWith(mockImages[index]);
        });
      });
    });

    describe("search", () => {
      test("search button sets start num", () => {
        const setStartNumMock = jest.fn();
        const useStateMock = createUseStateMock(null, null, [
          null,
          setStartNumMock,
        ]);
        React["useState"] = useStateMock;

        wrapper = setup();

        findByTestAttr(wrapper, "search-button").simulate("click");
        expect(setStartNumMock).toHaveBeenLastCalledWith(1);
      });
    });
  });
});
