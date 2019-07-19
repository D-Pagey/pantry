import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';

global.render = (ui) => {
    let queries;

    act(() => {
        queries = render(<Router history={createMemoryHistory()}>{ui}</Router>);
    });

    return queries;
};
