import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from 'Components/Dashboard/Dashboard';
import Login from 'Components/Login/Login';

export const Routes = {
    Root: '/',
    Dashboard: '/dashboard',
}

const App = (props) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
