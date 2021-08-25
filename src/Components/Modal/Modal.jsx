import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Overlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 60%;
  height: 85%;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.div`
  position: relative;
  top: -40px;
  left: -30px;
  width: fit-content;
  font-size: 3em;
  font-weight: bold;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  height: fit-content;
  width: 100%;
  padding: 40px 10px 10px 10px;
  display: flex;
  justify-content: center;
`;

const ModalTitle = styled.div`
  font-size: 2em;
  font-weight: bold;
  display: flex;
`;

const ModalContent = styled.div`
  display: flex;
  padding: 10px;
  margin: 20px;
  height: 100%;
  overflow: hidden;
`;

const Modal = ({ isOpen, title, onClose, children }) => {
  const [modalOpen, setModalOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Overlay data-test='overlay' isOpen={modalOpen}>
      {modalOpen && (
        <ModalWrapper data-test='modal-wrapper'>
          <CloseButton
            title='close-button'
            data-test='close-button'
            onClick={() => {
              setModalOpen(false);
              onClose();
            }}
          >
            x
          </CloseButton>
          <ModalHeader data-test='modal-header'>
            <ModalTitle data-test='modal-title'>{title}</ModalTitle>
          </ModalHeader>
          <ModalContent data-test='modal-content'>{children}</ModalContent>
        </ModalWrapper>
      )}
    </Overlay>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

Modal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  title: "",
};

export default Modal;
