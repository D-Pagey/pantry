import React from 'react';
import { render } from '../../test-utils';
import { colours } from '../../tokens';
import { DonutIcon } from '.';

const props = {
    colour: colours.orange
};

describe('DonutIcon component', () => {
    it('should render', () => {
        const { container } = render(<DonutIcon {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
