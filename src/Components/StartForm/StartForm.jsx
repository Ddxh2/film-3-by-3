import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Info } from "..";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const InputLabel = styled.label`
  width: 100%;
  font-size: 1.3em;
  margin-right: 50px;
`;

const Input = styled.input`
  margin: 5px;
  padding: 5px;
  font-size: 1.3em;
  width: 90%;
`;

const Footer = styled.div`
  margin-top: 20px;
`;

const Submit = styled.button`
  background: white;
  width: 60px;
  height: 30px;
  border-radius: 10px;
`;

const StartForm = ({ onSubmit }) => {
  const apiKeyRef = useRef();
  const cxRef = useRef();

  const handleSubmit = () => {
    if (
      !!apiKeyRef &&
      !!apiKeyRef.current &&
      !!apiKeyRef.current.value &&
      !!cxRef &&
      !!cxRef.current &&
      !!cxRef.current.value
    ) {
      const val = { cx: cxRef.current.value, apiKey: apiKeyRef.current.value };
      onSubmit(val);
    }
  };

  return (
    <Wrapper data-test='start-form'>
      <Title data-test='title'>Please Enter Your Details</Title>
      <Content data-test='content'>
        <table data-test='content-table'>
          <tbody>
            <tr>
              <td>
                <InputLabel data-test='api-key-label' htmlFor='api-key'>
                  Google API Key:
                </InputLabel>
              </td>
              <td>
                <Input id='api-key' data-test='api-key-input' ref={apiKeyRef} />
              </td>
              <td>
                <Info data-test='api-key-info' offset={30}>
                  {
                    <a
                      href='https://console.developers.google.com/'
                      target='_blank'
                      rel='noreferrer'
                      data-test='api-key-hover'
                    >
                      Create an API Key here
                    </a>
                  }
                </Info>
              </td>
            </tr>
            <tr>
              <td>
                <InputLabel data-test='cx-label' htmlFor='cx'>
                  Custom Search Engine ID:
                </InputLabel>
              </td>
              <td>
                <Input id='cx' data-test='cx-input' ref={cxRef} />
              </td>
              <td>
                <Info data-test='cx-info' offset={30}>
                  {
                    <a
                      href='https://cse.google.com/cse/create/new'
                      target='_blank'
                      rel='noreferrer'
                      data-test='cx-hover'
                    >
                      Create a Custom Search Engine here
                    </a>
                  }
                </Info>
              </td>
            </tr>
          </tbody>
        </table>
      </Content>
      <Footer data-test='footer'>
        <Submit data-test='footer-submit' onClick={handleSubmit}>
          Submit
        </Submit>
      </Footer>
    </Wrapper>
  );
};

StartForm.propTypes = {
  onSubmit: PropTypes.func,
};

StartForm.defaultProps = {
  onSubmit: () => {},
};

export default StartForm;
