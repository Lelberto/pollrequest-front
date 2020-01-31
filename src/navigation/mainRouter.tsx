import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { NavBar } from '../shared/components/navbar';
import { SignUpPage } from '../features/authentication/pages/signup';
import { SignInPage } from '../features/authentication/pages/signin';

/**
 * Main router of the app.
 */
export default function MainRouter() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <Route path="/signin">
                    <SignInPage />
                </Route>
                <Route path="/">
                    <SignUpPage />
                </Route>
            </Switch>
        </Router>
    )
}
