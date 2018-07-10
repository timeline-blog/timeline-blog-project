import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Landing from './components/Landing';
import Home from './components/Home/Home';

export default (
    <Switch>
        {/* not logged in */}
        <Route exact path="/" component={Landing} />

        {/* logged in */}
        <Route path="/home" component={Home} />
    </Switch>
);