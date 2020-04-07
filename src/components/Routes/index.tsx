import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageHome } from '../PageHome';
import { AddFoodForm } from '../AddFoodForm';
import { AddFoodForm2 } from '../AddFoodForm2';
import { FoodTable } from '../FoodTable';
import { PageSignIn } from '../PageSignIn';
import { PageProfile } from '../PageProfile';
import { RouteProtected } from '../RouteProtected';
import { PageNotFound } from '../PageNotFound';

export const Routes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/sign-in" component={PageSignIn} />
        <RouteProtected path="/profile" component={PageProfile} />
        <RouteProtected path="/add" component={AddFoodForm} />
        <RouteProtected path="/test" component={AddFoodForm2} />
        <RouteProtected path="/food/:category" component={FoodTable} />
        <Route component={PageNotFound} />
    </Switch>
);
