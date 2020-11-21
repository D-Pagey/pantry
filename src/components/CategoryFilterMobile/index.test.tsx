import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { CategoryFilterMobile } from '.';

const props = {
    selected: 'all',
    setSelected: () => null
};

describe('CategoryFilterMobile component', () => {
    it('should render', () => {
        const { container } = render(<CategoryFilterMobile {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle click', () => {
        const setSelected = jest.fn();

        const { getByText } = render(<CategoryFilterMobile {...props} setSelected={setSelected} />);

        userEvent.click(getByText('Fruit'));

        expect(setSelected).toHaveBeenCalledWith('fruit');
    });
});
