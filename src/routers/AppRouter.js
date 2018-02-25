import React from 'react'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from "./../components/ExpenseDashboardPage";
import AddExpensePage from "./../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import Help from "./../components/Help";
import NotFoundPage from "./../components/NotFoundPage";
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter=()=>(
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <Route path="/help" component={Help} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;

