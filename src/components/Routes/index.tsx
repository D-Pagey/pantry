import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { FoodType, TenantType, DatabaseFoodType, MetaDataType } from '../../types';
import { checkAndFormatFridge } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFood } from '../PageAddFood';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageSettings } from '../PageSettings';
import { PageSignIn } from '../PageSignIn';
import { PageMagicLanding } from '../PageMagicLanding';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>();
    const [tenants, setTenants] = useState<TenantType[]>();
    const [metaData, setMetaData] = useState<MetaDataType>();
    const { user, isAuthed } = useContext(AuthContext);

    const getFridgeData = useCallback(() => {
        if (user) {
            db.collection('households')
                .doc(user.household)
                // eslint-disable-next-line
                .onSnapshot((doc: any) => {
                    const data = doc.data();

                    if (data) {
                        const fridgeItems: DatabaseFoodType[] = Object.values(data.fridge);
                        const cleanData = checkAndFormatFridge(fridgeItems);
                        const firebaseTenants = Object.values(data.tenants) as TenantType[];

                        setMetaData(data.meta);
                        setFridge(cleanData);
                        setTenants(firebaseTenants.filter((tenant) => tenant.houseRole !== 'alexa'));
                    }
                });
        }
    }, [user]);

    useEffect(() => {
        if (user?.household) {
            getFridgeData();
        }
    }, [getFridgeData, user]);

    // TODO: move these checks into the routes and handle loading in page components
    // whilst waiting for fridge / metadata etc to load
    return (
        <Switch>
            <Route exact path="/">
                {isAuthed ? <Redirect to="food" /> : <PageHome />}
            </Route>

            <Route path="/test">{fridge && metaData && <PageAddFood fridge={fridge} metaData={metaData} />}</Route>

            <Route path="/sign-in">
                <PageSignIn />
            </Route>

            {/* used for magic sign in email link */}
            <Route path="/magic">
                <PageMagicLanding />
            </Route>

            <RouteProtected path="/food">
                {fridge && tenants && metaData && (
                    <PageFood fridge={fridge} tenants={tenants} categories={metaData.categories} />
                )}
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                {fridge && tenants && metaData && (
                    <PageEditFood fridge={fridge} tenants={tenants} metadata={metaData} />
                )}
            </RouteProtected>

            {metaData && fridge && (
                <RouteProtected path="/add">
                    <PageAddFood fridge={fridge} metaData={metaData} />
                </RouteProtected>
            )}

            {user && tenants && (
                <RouteProtected path="/settings">{tenants && <PageSettings tenants={tenants} />}</RouteProtected>
            )}

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
