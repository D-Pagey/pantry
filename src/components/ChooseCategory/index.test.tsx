import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';

import { ChooseCategory, ChooseCategoryProps } from '.';

const props: ChooseCategoryProps = {
    handleClick: () => null
};

describe('ChooseCategory component', () => {
    it('should render', () => {
        const { container } = render(<ChooseCategory {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick with category', () => {
        const handleClick = jest.fn();

        const { getByText } = render(<ChooseCategory {...props} handleClick={handleClick} />);

        userEvent.click(getByText('Meat'));

        expect(handleClick).toHaveBeenCalledWith('meat');
    });
});
