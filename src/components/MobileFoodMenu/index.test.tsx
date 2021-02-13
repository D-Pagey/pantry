import userEvent from '@testing-library/user-event';
import ReactModal from 'react-modal';

import { render, screen } from '../../test-utils';
import { FilterState } from '../PageFood/foodReducer';
import { MobileFoodMenu } from '.';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    // @ts-ignore
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush
    })
}));

const props = {
    handleFoodDelete: () => null,
    openModal: () => null
};

describe('MobileFoodMenu component', () => {
    it('should render', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should open modal when filter button clicked', () => {
        const openModal = jest.fn();

        render(<MobileFoodMenu {...props} openModal={openModal} />);

        userEvent.click(screen.getByTestId('filterMenuButton'));

        expect(openModal).toHaveBeenCalled();
    });

    it('should call handleFoodDelete if delete button clicked', () => {
        const handleFoodDelete = jest.fn();

        render(<MobileFoodMenu {...props} handleFoodDelete={handleFoodDelete} editingItemName="chicken" />);

        userEvent.click(screen.getByTestId('mobileFoodMenuDeleteButton'));

        expect(handleFoodDelete).toHaveBeenCalled();
    });

    it('should call history push if edit button clicked', () => {
        const editingItemName = 'chicken';

        render(<MobileFoodMenu {...props} editingItemName={editingItemName} />);

        userEvent.click(screen.getByTestId('mobileFoodMenuEditButton'));

        expect(mockHistoryPush).toHaveBeenCalledWith(`/${editingItemName}/edit`);
    });

    it('should call history push if add button clicked', () => {
        render(<MobileFoodMenu {...props} />);

        userEvent.click(screen.getByText('Add Item'));

        expect(mockHistoryPush).toHaveBeenCalledWith('/add');
    });
});
