import React from "react";
import styled from "styled-components";

import { FilmDisplay } from "../";

const Wrapper = styled.table`
  border-collapse: collapse;
  margin: auto;
`;

const FilmBody = styled.tbody``;

const FilmRow = styled.tr``;

const FilmCell = styled.td`
  padding: 20px;
`;

const shape = Array(3).fill(Array(3).fill(0));

const FilmGrid = () => {
  return (
    <Wrapper data-test='wrapper'>
      <FilmBody data-test='film-body'>
        {shape.map((row, index) => (
          <FilmRow data-test='film-row' key={index}>
            {row.map((_, index) => (
              <FilmCell data-test='film-cell' key={index}>
                <FilmDisplay data-test='film-display' />
              </FilmCell>
            ))}
          </FilmRow>
        ))}
      </FilmBody>
    </Wrapper>
  );
};

export default FilmGrid;
