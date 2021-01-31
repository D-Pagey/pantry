import React from 'react';
import { render, screen } from '../../test-utils';
import { FilterButton } from '.';
import userEvent from '@testing-library/user-event';

const props = {
    onClick: () => null
};

describe('FilterButton component', () => {
    it('should render', () => {
        const { container } = render(<FilterButton {...props}>Vegetables</FilterButton>);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick when X clicked', () => {
        const onClick = jest.fn();
        render(
            <FilterButton {...props} onClick={onClick}>
                Vegetables
            </FilterButton>
        );

        userEvent.click(screen.getByText('X'));

        expect(onClick).toHaveBeenCalled();
    });
});
