import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { FoodOptions } from '.';

const props = {
    handleDelete: () => {},
    handleEdit: () => {},
    name: 'carrot'
};

describe('FoodOptions component', () => {
    it('should render', () => {
        const { container } = render(<FoodOptions {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call handleDelete when eat clicked', () => {
        const handleDelete = jest.fn();
        const { getByText } = render(<FoodOptions {...props} handleDelete={handleDelete} />);

        userEvent.click(getByText(`Remove ${props.name}`));

        expect(handleDelete).toHaveBeenCalled();
    });

    it('should call handleEdit when edit clicked', () => {
        const handleEdit = jest.fn();
        const { getByText } = render(<FoodOptions {...props} handleEdit={handleEdit} />);

        userEvent.click(getByText(`Amend ${props.name}`));

        expect(handleEdit).toHaveBeenCalled();
    });
});
