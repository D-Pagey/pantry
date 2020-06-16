import React from 'react';
import userEvent from '@testing-library/user-event';
import { DisposeFood } from '.';

const props = {
    handleClick: () => {}
};

describe('DisposeFood component', () => {
    it('should render', () => {
        const { container } = render(<DisposeFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it.each`
        option     | label
        ${'eat'}   | ${'Eat'}
        ${'chuck'} | ${'Chuck'}
    `('should call handleClick with $option', ({ option, label }) => {
        const handleClick = jest.fn();
        const { getByText } = render(<DisposeFood handleClick={handleClick} />);

        userEvent.click(getByText(label));

        expect(handleClick).toHaveBeenCalledWith(option);
    });
});
