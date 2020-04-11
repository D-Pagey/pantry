/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { FirebaseContext } from './components/ProviderFirebase';

global.render = (ui, firebaseContextValue = {}) => {
  let queries;

  act(() => {
    queries = render(
      <FirebaseContext.Provider
        value={{
          categories: [],
          isAuthed: false,
          setUser: () => {},
          setIsAuthed: () => {},
          user: {},
          ...firebaseContextValue,
        }}
      >
        <MemoryRouter>{ui}</MemoryRouter>
      </FirebaseContext.Provider>,
    );
  });

  return queries;
};
