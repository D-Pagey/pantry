import { HouseRoleType, TenantType } from '../../types';

const sortOrder: HouseRoleType[] = ['admin', 'tenant', 'alexa', 'pending'];

export const getSortedTenants = (tenants: TenantType[]): TenantType[] => {
    return [...tenants].sort((a, b) => {
        const aOrder = sortOrder.indexOf(a.houseRole);
        const bOrder = sortOrder.indexOf(b.houseRole);

        if (aOrder < bOrder) return -1;
        if (aOrder > bOrder) return 1;

        return 0;
    });
};
