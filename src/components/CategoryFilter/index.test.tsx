import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { CategoryFilter } from '.';

const props = {
    selected: 'all',
    setSelected: () => null
};

describe('CategoryFilter component', () => {
    it('should render', () => {
        const { container } = render(<CategoryFilter {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle click', () => {
        const setSelected = jest.fn();

        const { getByText } = render(<CategoryFilter {...props} setSelected={setSelected} />);

        userEvent.click(getByText('Fruit'));

        expect(setSelected).toHaveBeenCalledWith('fruit');
    });
});
