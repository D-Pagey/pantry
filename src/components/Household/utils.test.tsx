import { TenantHeidi, TenantDan, TenantJoe, TenantAlexa } from '../../fixtures';
import { TenantType } from '../../types';
import { getSortedTenants } from './utils';

const AdminHeidi: TenantType = {
    ...TenantHeidi,
    houseRole: 'admin'
};

const InvitedJoe: TenantType = {
    ...TenantJoe,
    houseRole: 'pending'
};

const Dan: TenantType = {
    ...TenantDan,
    houseRole: 'tenant'
};

const Toni: TenantType = {
    ...TenantJoe,
    houseRole: 'tenant'
};

const tenants: TenantType[] = [InvitedJoe, TenantAlexa, AdminHeidi, Dan, Toni];

describe('getSortedTenants function', () => {
    it('should return tenants in correct order', () => {
        const sorted = getSortedTenants(tenants);
        expect(sorted).toStrictEqual([AdminHeidi, Dan, Toni, TenantAlexa, InvitedJoe]);
    });
});
