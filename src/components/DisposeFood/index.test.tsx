import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { DisposeFood } from '.';

const props = {
    handleDelete: () => {},
    handleEdit: () => {},
    name: 'carrot'
};

describe('DisposeFood component', () => {
    it('should render', () => {
        const { container } = render(<DisposeFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call handleDelete when eat clicked', () => {
        const handleDelete = jest.fn();
        const { getByText } = render(<DisposeFood {...props} handleDelete={handleDelete} />);

        userEvent.click(getByText("Eat all carrot's"));

        expect(handleDelete).toHaveBeenCalled();
    });

    it('should call handleEdit when edit clicked', () => {
        const handleEdit = jest.fn();
        const { getByText } = render(<DisposeFood {...props} handleEdit={handleEdit} />);

        userEvent.click(getByText('Edit servings'));

        expect(handleEdit).toHaveBeenCalled();
    });
});
