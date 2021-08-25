import { checkPropTypes } from "prop-types";

export const findByTestAttr = (wrapper, testAttr) => {
  return wrapper.find(`[data-test='${testAttr}']`);
};

export const wrapperRendered = (wrapper, testAttr) => {
  const testWrapper = findByTestAttr(wrapper, testAttr);
  expect(testWrapper.length).toBe(1);
};

export const wrapperNotRendered = (wrapper, testAttr) => {
  const testWrapper = findByTestAttr(wrapper, testAttr);
  expect(testWrapper.length).toBe(0);
};

export const checkProps = (Component, props) => {
  const propError = checkPropTypes(
    Component.propTypes,
    props,
    "prop",
    Component.name
  );
  expect(propError).toBe(undefined);
};
