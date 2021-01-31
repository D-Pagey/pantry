import { render, screen } from '../../test-utils';
import { MobileFoodMenu } from '.';
import userEvent from '@testing-library/user-event';

const props = {
    handleFilterClick: () => null
};

describe('MobileFoodMenu component', () => {
    it('should render', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call handleFilterClick when filter button clicked', () => {
        const handleFilterClick = jest.fn();
        render(<MobileFoodMenu {...props} handleFilterClick={handleFilterClick} />);

        userEvent.click(screen.getByTestId('filterMenuButton'));

        expect(handleFilterClick).toHaveBeenCalled();
    });
});
