import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Chevron, CHEVRON_DIRECTIONS } from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 50px;
`;

const BackButtons = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
`;

const ForwardButtons = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  padding-left: 10px;
`;

const StepButton = styled.div`
  display: flex;
  margin: 0px 5px 0px 5px;
  &:hover {
    opacity: 0.4;
  }
  cursor: pointer;
`;

const Pagination = ({ stepSize, onChange, currNum, showNext }) => {
  return (
    <Wrapper data-test='wrapper'>
      <BackButtons data-test='back-buttons'>
        {currNum > stepSize + 1 && (
          <StepButton data-test='full-back-button' onClick={() => onChange(1)}>
            <Chevron
              data-test='chevron'
              isDouble={true}
              rotate={CHEVRON_DIRECTIONS.LEFT}
            />
          </StepButton>
        )}

        {currNum !== 1 && (
          <StepButton
            data-test='single-back-button'
            onClick={() => onChange(Math.max(1, currNum - stepSize))}
          >
            <Chevron data-test='chevron' rotate={CHEVRON_DIRECTIONS.LEFT} />
          </StepButton>
        )}
      </BackButtons>

      <ForwardButtons data-test='forward-buttons'>
        {showNext && (
          <StepButton
            data-test='single-forward-button'
            onClick={() => onChange(currNum + stepSize)}
          >
            <Chevron data-test='chevron' rotate={CHEVRON_DIRECTIONS.RIGHT} />
          </StepButton>
        )}
      </ForwardButtons>
    </Wrapper>
  );
};

Pagination.propTypes = {
  stepSize: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  currNum: PropTypes.number.isRequired,
  showNext: PropTypes.bool,
};

Pagination.defaultProps = {
  onChange: () => {},
  showNext: false,
};

export default Pagination;
