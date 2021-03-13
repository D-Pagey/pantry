import { render } from '../../test-utils';
import { colours } from '../../tokens';
import { CircleIcon } from '.';

const props = {
    colour: colours.orange
};

describe('CircleIcon component', () => {
    it('should render', () => {
        const { container } = render(<CircleIcon {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
