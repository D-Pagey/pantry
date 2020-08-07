import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '../../test-utils';
import { Routes } from '.';

describe('Routes component', () => {
    it.each`
        pageTestId        | path           | isAuthed
        ${'pageHome'}     | ${'/'}         | ${false}
        ${'PageSettings'} | ${'/settings'} | ${true}
    `('should render $pageTestId for $path', ({ pageTestId, path, isAuthed }) => {
        const { getByTestId } = render(
            <MemoryRouter initialEntries={[path]}>
                <Routes />
            </MemoryRouter>,
            { isAuthed }
        );

        getByTestId(pageTestId);
    });

    it.todo('test every route');
});
