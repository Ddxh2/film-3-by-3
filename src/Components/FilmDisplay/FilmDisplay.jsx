import React from "react";
import styled from "styled-components";

import { GoogleImageSearch, Modal } from "..";

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  border-radius: 50px;
  overflow: hidden;
`;

const ImageDisplay = styled.div`
  width: 200px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = styled.div`
  background: lightcoral;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: ${({ widthMax }) => (widthMax ? "auto" : "100%")};
  height: ${({ widthMax }) => (widthMax ? "100%" : "auto")};
  cursor: pointer;
`;

const SearchImage = styled.img`
  width: 75%;
  heght: auto;
`;

const FilmDisplay = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  return (
    <Wrapper data-test='wrapper'>
      <ImageDisplay data-test='image-display'>
        {!!image ? (
          <Image
            data-test='image'
            widthMax={image.widthMax}
            src={image.url}
            onDoubleClick={() => setImage(null)}
          />
        ) : (
          <Search data-test='search' onClick={() => setModalOpen(true)}>
            <SearchImage data-test='search-icon' src='./SearchIcon.png' />
          </Search>
        )}
      </ImageDisplay>
      <Modal
        data-test='modal'
        title='Search for a Film'
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <GoogleImageSearch
          data-test='google-image-search'
          onSelect={(image) => {
            setImage(image);
            setModalOpen(false);
          }}
        />
      </Modal>
    </Wrapper>
  );
};

export default FilmDisplay;
