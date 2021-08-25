import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, wrapperRendered } from "../../utils/testUtils";

import { FilmGrid } from "./";

describe("FilmGrid", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<FilmGrid />)));
  describe("render", () => {
    test("renders without error", () => expect(wrapper.length).toBe(1));

    test("component wrapper renders without error", () =>
      wrapperRendered(wrapper, "wrapper"));

    test("film body renders without error", () =>
      wrapperRendered(wrapper, "film-body"));

    test("3 film rows are rendered inside film body", () => {
      const filmBodyWrapper = findByTestAttr(wrapper, "film-body");
      const filmRowsWrapper = findByTestAttr(filmBodyWrapper, "film-row");
      expect(filmRowsWrapper.length).toBe(3);
    });

    test("3 film cells are rendered inside each film row", () => {
      const filmRowsWrapper = findByTestAttr(wrapper, "film-row");
      filmRowsWrapper.forEach((rowWrapper) => {
        const filmCellsWrapper = findByTestAttr(rowWrapper, "film-cell");
        expect(filmCellsWrapper.length).toBe(3);
      });
    });

    test("film display rendered inside each film-cell", () => {
      const filmCellsWrapper = findByTestAttr(wrapper, "film-cell");
      filmCellsWrapper.forEach((cellWrapper) =>
        wrapperRendered(cellWrapper, "film-display")
      );
    });
  });
});
