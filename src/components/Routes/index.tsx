import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FoodType, TenantType, BatchType, DatabaseFoodType } from '../../types';
import { formatExpiryDates, countExpiringFoodItems } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageSettings } from '../PageSettings';
import { PageSignIn } from '../PageSignIn';
import { PageMagicLanding } from '../PageMagicLanding';
import { PageDev } from '../PageDev';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>();
    const [tenants, setTenants] = useState<TenantType[]>();
    const [expiringCount, setExpiringCount] = useState<number>(0);
    const { user } = useContext(AuthContext);

    const updateBatch = ({ name, batch }: { name: string; batch: BatchType }): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({
                    [`fridge.${name}.batches.${batch.id}`]: batch
                })
                .then(() => toast.success(`Batch updated for ${name}`))
                .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const updateNameAndCategory = ({ name, category }: { name: string; category: string }): void => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .update({
                    [`fridge.${name}`]: { name, category }
                })
                .then(() => toast.success(`${name} (${category}) added`))
                .catch(() => toast.error('Error with updating fridge'));
        }
    };

    const getFridgeData = useCallback(() => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                .onSnapshot((doc: any) => {
                    const data = doc.data();
                    const fridgeItems: DatabaseFoodType[] = Object.values(data.fridge);
                    const formattedDates = formatExpiryDates(fridgeItems);

                    setFridge(formattedDates);
                    setExpiringCount(countExpiringFoodItems(formattedDates));
                    setTenants(Object.values(data.tenants));
                });
        }
    }, [user]);

    useEffect(() => {
        if (user?.household) {
            getFridgeData();
        }
    }, [getFridgeData, user]);

    return (
        <Switch>
            <Route exact path="/">
                <PageHome expiringCount={expiringCount} />
            </Route>

            <Route path="/sign-in">
                <PageSignIn />
            </Route>

            <Route path="/magic">
                <PageMagicLanding />
            </Route>

            <Route path="/dev">
                <PageDev />
            </Route>

            <RouteProtected path="/food">
                {fridge && tenants && <PageFood fridge={fridge} tenants={tenants} />}
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                {fridge && tenants && <PageEditFood fridge={fridge} tenants={tenants} updateBatch={updateBatch} />}
            </RouteProtected>

            <RouteProtected path="/add">
                <PageAddFoodForm
                    fridge={fridge}
                    updateNameAndCategory={updateNameAndCategory}
                    updateBatch={updateBatch}
                />
            </RouteProtected>

            <RouteProtected path="/settings">{tenants && <PageSettings tenants={tenants} />}</RouteProtected>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
