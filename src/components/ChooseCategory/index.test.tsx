import React from 'react';
import { render } from '@testing-library/react';
import { ChooseCategory } from '.';

describe('ChooseCategory component', () => {
    it('should render', () => {
        const { container } = render(<ChooseCategory />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
