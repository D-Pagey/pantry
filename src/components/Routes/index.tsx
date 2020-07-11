import React, { useContext, useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FoodType } from '../../types';
import { formatExpiryDates, countExpiringFoodItems } from '../../utils';
import { db } from '../../services';
import { AuthContext } from '../ProviderAuth';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageFood } from '../PageFood';
import { PageEditFood } from '../PageEditFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageProfile } from '../PageProfile';
import { PageSignIn } from '../PageSignIn';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => {
    const [fridge, setFridge] = useState<FoodType[]>();
    const [expiringCount, setExpiringCount] = useState<number>(0);
    const { user } = useContext(AuthContext);

    const updateFridge = (values: FoodType): void => {
        db.collection('households')
            .doc(user?.household)
            .update({ [`fridge.${values.name}`]: values })
            .then(() => {
                return toast.success('Food item added');
            })
            .catch(() => toast.error('Error with updating fridge'));
    };

    const getFridgeData = useCallback(() => {
        db.collection('households')
            .doc(user!.household)
            .onSnapshot((doc: any) => {
                const fridgeItems: FoodType[] = Object.values(doc.data().fridge);
                const formattedDates = formatExpiryDates(fridgeItems);

                setFridge(formattedDates);
                setExpiringCount(countExpiringFoodItems(formattedDates));
            });
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

            <RouteProtected path="/food">
                <PageFood fridge={fridge} />
            </RouteProtected>

            <RouteProtected path="/:name/edit">
                <PageEditFood updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/add">
                <PageAddFoodForm fridge={fridge} updateFridge={updateFridge} />
            </RouteProtected>

            <RouteProtected path="/profile">
                <PageProfile />
            </RouteProtected>

            <Route>
                <PageNotFound />
            </Route>
        </Switch>
    );
};
