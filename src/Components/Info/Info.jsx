import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const InfoIcon = styled.img`
  width: 20px;
  height: auto;
`;

const ToolTipWrapper = styled.div`
  display: ${({ isShown }) => (isShown ? "flex" : "none")};

  position: absolute;
  top: ${({ top }) => (!!top ? top : 0)}px;
  left: ${({ left }) => (!!left ? left : 0)}px;
  margin-left: ${({ offset }) => (!!offset ? offset : 0)}px;
`;

const ToolTipBody = styled.div`
  display: flex;
  max-width: 300px;
  flex-wrap: wrap;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background: lightgrey;
  padding: 0px 5px 0px 5px;
`;

const ToolTipArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 10px solid lightgrey;
  margin-top: -5px;
  margin-left: -10px;
  position: absolute;
  top: 50%;
  left: 0;
`;

const Info = ({ offset, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [toolTipPosition, setToolTipPosition] = React.useState({
    left: 0,
    top: 0,
  });

  const infoRef = React.useRef();

  React.useEffect(() => {
    if (isHovered && !!infoRef && !!infoRef.current) {
      const boundingRect = infoRef.current.getBoundingClientRect();
      const { left, top } = boundingRect;
      setToolTipPosition(() => ({ top, left }));
    }
  }, [isHovered]);

  return (
    <>
      <InfoIcon
        ref={infoRef}
        src='./info.png'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-test='info-icon'
      />
      <ToolTipWrapper
        data-test='tooltip-wrapper'
        isShown={isHovered}
        top={toolTipPosition.top}
        left={toolTipPosition.left}
        offset={offset}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ToolTipBody data-test='tooltip-body'>{children}</ToolTipBody>
        <ToolTipArrow data-test='tooltip-arrow' />
      </ToolTipWrapper>
    </>
  );
};

Info.propTypes = {
  offset: PropTypes.number,
};

Info.defaultProps = {
  offset: 0,
};

export default Info;
