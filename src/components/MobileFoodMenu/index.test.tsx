import userEvent from '@testing-library/user-event';
import ReactModal from 'react-modal';
import { render, screen } from '../../test-utils';
import { Categories, TenantDan, TenantHeidi } from '../../fixtures';
import { SortOptions } from '../PageFood/foodReducer';
import { FilterState } from './filterReducer';
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
    categories: Categories,
    handleFoodDelete: () => null,
    handleApplyFilters: () => null,
    tenants: [TenantHeidi, TenantDan],
    foodPageFilters: {
        selectedOwners: [TenantHeidi.uid, TenantDan.uid],
        showOnlyExpiring: true,
        sortBy: 'name' as SortOptions,
        category: ''
    }
};

describe('MobileFoodMenu component', () => {
    it('should render', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should open modal when filter button clicked', () => {
        const { container } = render(<MobileFoodMenu {...props} />);
        ReactModal.setAppElement(container);

        userEvent.click(screen.getByTestId('filterMenuButton'));

        screen.getByText('Set Filters');
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

    it('should call handleApplyFilters with changed values', async () => {
        const handleApplyFilters = jest.fn();

        const { container } = render(<MobileFoodMenu {...props} handleApplyFilters={handleApplyFilters} />);
        ReactModal.setAppElement(container);

        userEvent.click(screen.getByTestId('filterMenuButton'));
        // deselect one tenant in filters
        userEvent.click(screen.getByTestId(`photo-${props.tenants[1].uid}`));
        // click All Items instead of Expiring Soon
        userEvent.click(screen.getByText('All Items'));
        // click Date to sort by date instead of default name
        userEvent.click(screen.getByText('Date'));
        userEvent.click(screen.getByText('Apply Filters'));

        const updatedFilters: FilterState = {
            selectedOwners: [props.tenants[0].uid],
            showOnlyExpiring: false,
            sortBy: 'date',
            category: ''
        };

        expect(handleApplyFilters).toHaveBeenCalledWith(updatedFilters);
    });

    it('add an owner if not selected', () => {
        const handleApplyFilters = jest.fn();
        const foodPageFilters = {
            ...props.foodPageFilters,
            selectedOwners: []
        };
        const ownerToSelect = props.tenants[1].uid;

        const { container } = render(
            <MobileFoodMenu {...props} handleApplyFilters={handleApplyFilters} foodPageFilters={foodPageFilters} />
        );
        ReactModal.setAppElement(container);

        userEvent.click(screen.getByTestId('filterMenuButton'));
        // select one tenant in filters
        userEvent.click(screen.getByTestId(`photo-${ownerToSelect}`));
        userEvent.click(screen.getByText('Apply Filters'));

        const updatedFilters: FilterState = {
            ...props.foodPageFilters,
            selectedOwners: [ownerToSelect]
        };

        expect(handleApplyFilters).toHaveBeenCalledWith(updatedFilters);
    });

    it('should handle a cancel click', () => {
        const handleApplyFilters = jest.fn();

        const { container } = render(<MobileFoodMenu {...props} handleApplyFilters={handleApplyFilters} />);
        ReactModal.setAppElement(container);

        userEvent.click(screen.getByTestId('filterMenuButton'));
        // deselect one tenant in filters
        userEvent.click(screen.getByTestId(`photo-${props.tenants[1].uid}`));
        // click All Items instead of Expiring Soon
        userEvent.click(screen.getByText('All Items'));
        // click Date to sort by date instead of default name
        userEvent.click(screen.getByText('Date'));

        // Click cancel instead of applying filters
        userEvent.click(screen.getByText('Cancel'));

        // expect modal to have closed
        expect(screen.queryByText('Set Filters')).not.toBeInTheDocument();

        // reopen modal
        userEvent.click(screen.getByTestId('filterMenuButton'));
        // click apply
        userEvent.click(screen.getByText('Apply Filters'));
        // expect state to be same as originally passed in
        expect(handleApplyFilters).toHaveBeenCalledWith(props.foodPageFilters);
    });
});
