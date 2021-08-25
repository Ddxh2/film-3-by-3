import React from "react";
import styled from "styled-components";

import { FilmGrid, StartForm } from "./Components";
import { CustomSearchContext } from "./Context";

import "./App.css";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17px;
  padding: 20px;
  background: lightblue;
  border: 1px solid lightblue;
  border-radius: 50px;
  box-shadow: 0px 0px 20px 3px #8dbfcf;
`;

function App() {
  const [customSearchContext, setCustomSearchContext] = React.useState(null);

  return (
    <AppWrapper data-test='app-wrapper'>
      <CustomSearchContext.Provider
        value={customSearchContext || { cx: "", apiKey: "" }}
      >
        {!!customSearchContext ? (
          <>
            <FilmGrid data-test='film-grid' />
          </>
        ) : (
          <StartForm
            data-test='start-form'
            onSubmit={(val) => setCustomSearchContext(val)}
          />
        )}
      </CustomSearchContext.Provider>
    </AppWrapper>
  );
}

export default App;
