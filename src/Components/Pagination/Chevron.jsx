import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ChevronWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 5px;
  width: 30px;
  transform: rotate(${({ rotate }) => rotate}deg);
`;

const ChevronBefore = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 51%;
  background: black;
  transform: skew(0deg, 30deg);
`;

const ChevronAfter = styled.div`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 50%;
  background: black;
  transform: skew(0deg, -30deg);
`;

const SecondChevronBefore = styled.div`
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  height: 100%;
  width: 51%;
  background: black;
  transform: skew(0deg, 30deg);
`;

const SecondChevronAfter = styled.div`
  content: "";
  position: absolute;
  top: 10px;
  right: 0;
  height: 100%;
  width: 50%;
  background: black;
  transform: skew(0deg, -30deg);
`;

export const CHEVRON_DIRECTIONS = { LEFT: 90, RIGHT: 270 };

const Chevron = ({ isDouble, rotate = CHEVRON_DIRECTIONS.LEFT }) => {
  return (
    <ChevronWrapper data-test='chevron-wrapper' rotate={rotate}>
      <ChevronBefore data-test='chevron-before' />
      <ChevronAfter data-test='chevron-after' />
      {isDouble && (
        <>
          <SecondChevronBefore data-test='second-chevron-before' />
          <SecondChevronAfter data-test='second-chevron-after' />
        </>
      )}
    </ChevronWrapper>
  );
};

Chevron.propTypes = {
  isDouble: PropTypes.bool,
  rotate: PropTypes.oneOf([CHEVRON_DIRECTIONS.LEFT, CHEVRON_DIRECTIONS.RIGHT]),
};

Chevron.defaultProps = {
  isDouble: false,
  rotate: CHEVRON_DIRECTIONS.RIGHT,
};

export default Chevron;
