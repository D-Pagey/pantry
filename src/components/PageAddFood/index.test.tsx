import { render } from '../../test-utils';
import { PageAddFood } from '.';
import { Fridge, MetaData } from '../../fixtures';

const props = {
    fridge: Fridge,
    metaData: MetaData
};

describe('PageAddFood component', () => {
    it('should render', () => {
        const { container } = render(<PageAddFood {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
