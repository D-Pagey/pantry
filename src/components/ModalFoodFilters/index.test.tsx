import { render } from '../../test-utils';
import { Categories, TenantDan, TenantJoe } from '../../fixtures';
import { SortOptions } from '../PageFood/foodReducer';
import { ModalFoodFilters } from '.';

const props = {
    categories: Categories,
    dispatch: () => null,
    filters: {
        category: '',
        sortBy: 'name' as SortOptions,
        showOnlyExpiring: false,
        selectedOwners: [TenantDan.uid, TenantJoe.uid]
    },
    handleApplyFiltersClick: () => null,
    handleCancelClick: () => null,
    isModalOpen: false,
    tenants: [TenantDan, TenantJoe]
};

describe('ModalFoodFilters component', () => {
    it('should render', () => {
        const { container } = render(<ModalFoodFilters {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
