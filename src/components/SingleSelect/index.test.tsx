import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { colours } from '../../tokens';
import { SingleSelect } from '.';

const props = {
    options: [
        {
            label: '20+',
            value: 20
        },
        {
            label: '40+',
            value: 40
        }
    ],
    setSelected: () => {},
    testId: 'singleSelect'
};

describe('SingleSelect component', () => {
    it('should render', () => {
        const { container } = render(<SingleSelect {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should handle click', () => {
        const setSelected = jest.fn();
        const { getByTestId } = render(<SingleSelect {...props} setSelected={setSelected} />);
        const button = getByTestId('singleSelectButton0');

        userEvent.click(button);

        expect(setSelected).toHaveBeenCalledWith(props.options[0]);
    });

    it('should render correct selected/unselected buttons', () => {
        const { getByTestId } = render(<SingleSelect {...props} selected={20} />);

        expect(getByTestId('singleSelectButton0')).toHaveStyleRule('background-color', colours.darkGreen100);
        expect(getByTestId('singleSelectButton1')).toHaveStyleRule('background-color', colours.white);
    });
});
