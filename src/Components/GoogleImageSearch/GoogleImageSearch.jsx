import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

import { Pagination } from "../";
import { CustomSearchContext } from "../../Context";

const Wrapper = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: scroll;
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  height: fit-content;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: ${({ widthMax }) => (widthMax ? "auto" : "125px")};
  height: ${({ widthMax }) => (widthMax ? "125px" : "auto")};
  margin: 10px;
  cursor: pointer;
`;

const Search = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  margin-bottom: 50px;
`;

const SearchInput = styled.input`
  width: 80%;
  margin: 5px;
  padding: 5px;
  font-size: 1.3em;
`;

const SearchButton = styled.button`
  cursor: pointer;
  width: fit-content;
  margin: auto;
  font-size: 1.3em;
  margin-left: 20px;
  padding: 5px 10px 5px 10px;
  border: none;
  border-radius: 5px;
  background: #e6e6e6;
  &:hover {
    box-shadow: 0px 0px 12px 0px grey;
  }
`;

const Footer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
`;

const json = {
  num: 10,
  searchType: "image",
};

const sendRequest = (
  searchString,
  start,
  callback,
  errorCallback,
  searchContext
) => {
  axios
    .get("https://www.googleapis.com/customsearch/v1", {
      params: {
        ...json,
        cx: searchContext.cx,
        key: searchContext.apiKey,
        start,
        q: searchString,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log(error);
      errorCallback(error);
    });
};

const GoogleImageSearch = ({ onSelect }) => {
  const [response, setResponse] = React.useState(null);
  const [images, setImages] = React.useState(null);
  const [startNum, setStartNum] = React.useState(null);
  const [error, setError] = React.useState(null);

  const customSearchContext = React.useContext(CustomSearchContext);

  React.useEffect(() => {
    if (!!response) {
      setImages(() =>
        response.data.items.map(({ link, image: { height, width } }) => ({
          url: link,
          widthMax: width >= height,
        }))
      );
    }
  }, [response]);

  const searchRef = React.useRef();

  React.useEffect(() => {
    searchRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (startNum !== null && !!searchRef.current && !!searchRef.current.value) {
      sendRequest(
        searchRef.current.value,
        startNum,
        setResponse,
        setError,
        customSearchContext
      );
    }
  }, [startNum, customSearchContext]);
  return (
    <Wrapper data-test='wrapper'>
      <Search data-test='search-wrapper'>
        <SearchInput
          title='search-input'
          data-test='search-input'
          type='text'
          ref={searchRef}
          placeholder='Please type the name of a film and press search'
        />
        <SearchButton
          title='search-button'
          data-test='search-button'
          onClick={() => setStartNum(1)}
        >
          Search
        </SearchButton>
      </Search>
      <Content data-test='content-wrapper'>
        {!!images &&
          !error &&
          images.map((image, index) => (
            <Image
              data-test='image'
              widthMax={image.widthMax}
              src={image.url}
              key={index}
              onClick={() => onSelect(image)}
            />
          ))}
        {!!error && `${error.toString()}`}
      </Content>
      <Footer data-test='footer-wrapper'>
        {!!images && (
          <Pagination
            data-test='pagination'
            showNext={!!response.data.queries.nextPage}
            stepSize={10}
            currNum={startNum}
            onChange={setStartNum}
          />
        )}
      </Footer>
    </Wrapper>
  );
};

GoogleImageSearch.propTypes = {
  onSelect: PropTypes.func,
};

GoogleImageSearch.defaultProps = {
  onSelect: () => {},
};

export default GoogleImageSearch;
