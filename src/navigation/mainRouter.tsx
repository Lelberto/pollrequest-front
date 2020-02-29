import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { NavBar } from '../shared/components/navbar';
import { SignUpPage } from '../features/authentication/pages/signup';
import { SignInPage } from '../features/authentication/pages/signin';
import { MyUserPage } from "../features/user/myUserPage";
import { PollPage } from "../features/poll/pollPage";

/**
 * Main router of the app.
 */
export default function MainRouter() {
    return (
        <Router>
            <NavBar />
            <br />
            <Switch>
                <Route exact path="/">
                    <SignUpPage />
                </Route>
                <Route exact path="/account">
                    <MyUserPage />
                </Route>
                <Route exact path="/polls">
                    <PollPage />
                </Route>
                <Route exact path="/signup">
                    <SignUpPage />
                </Route>
                <Route exact path="/signin">
                    <SignInPage />
                </Route>

            </Switch>
        </Router>
    )
}
