import React from 'react';
import { render } from '@testing-library/react';
import { ChooseCategory, ChooseCategoryTypes } from '.';

const props: ChooseCategoryTypes = {
    onClick: () => null
};

describe('ChooseCategory component', () => {
    it('should render', () => {
        const { container } = render(<ChooseCategory {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
