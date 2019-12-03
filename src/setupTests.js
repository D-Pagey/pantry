/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { FirestoreContext } from './components/ProviderFirestore';

afterEach(() => {
    jest.clearAllMocks();
});

global.render = (ui, firebaseContextValue = {}) => {
    let queries;

    act(() => {
        queries = render(
            <FirestoreContext.Provider
                value={{
                    error: '',
                    loading: false,
                    updateFridge: () => {},
                    value: undefined,
                    ...firebaseContextValue
                }}
            >
                <Router history={createMemoryHistory()}>{ui}</Router>
            </FirestoreContext.Provider>
        );
    });

    return queries;
};

global.setMatchMedia = (viewportWidth) => {
    global.matchMedia = jest.fn().mockImplementation((query) => {
        const isMinWidth = query.includes('min-width');
        const isMaxWidth = query.includes('max-width');
        const queryWidth = parseInt((/(\d+)px/.exec(query) || [])[0], 10);

        let matches = false;

        if (isMinWidth) matches = viewportWidth > queryWidth;
        if (isMaxWidth) matches = viewportWidth < queryWidth;

        return {
            matches,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn()
        };
    });
};

setMatchMedia(320);
