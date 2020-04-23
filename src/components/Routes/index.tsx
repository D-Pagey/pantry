import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageCategories } from '../PageCategories';
import { PageFood } from '../PageFood';
import { PageHome } from '../PageHome';
import { PageNotFound } from '../PageNotFound';
import { PageProfile } from '../PageProfile';
import { PageSignIn } from '../PageSignIn';
import { RouteProtected } from '../RouteProtected';

export const Routes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/categories" component={PageCategories} />
        <Route path="/sign-in" component={PageSignIn} />
        <RouteProtected path="/profile" component={PageProfile} />
        <RouteProtected path="/add" component={PageAddFoodForm} />
        <RouteProtected path="/food/:category" component={PageFood} />
        <Route component={PageNotFound} />
    </Switch>
);
