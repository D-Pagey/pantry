import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PageHome } from '../PageHome';
import { PageAddFoodForm } from '../PageAddFoodForm';
import { PageFood } from '../PageFood';
import { PageSignIn } from '../PageSignIn';
import { PageProfile } from '../PageProfile';
import { RouteProtected } from '../RouteProtected';
import { PageNotFound } from '../PageNotFound';

export const Routes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={PageHome} />
        <Route path="/sign-in" component={PageSignIn} />
        <RouteProtected path="/profile" component={PageProfile} />
        <RouteProtected path="/add" component={PageAddFoodForm} />
        <RouteProtected path="/food/:category" component={PageFood} />
        <Route component={PageNotFound} />
    </Switch>
);
