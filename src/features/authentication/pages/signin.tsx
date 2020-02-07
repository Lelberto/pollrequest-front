import React, { Component } from 'react';
import { Button, Grid, Segment, Message, Header, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Form } from 'formsy-semantic-ui-react';
import { AuthHttpService } from '../../../services/http/authHttpService';
import { User } from '../../../models/User';

type LoginFormData = {
    email: string,
    password: string
}

/**
 * Signin page.
 */
export class SignInPage extends Component {
    authService = new AuthHttpService();

    submit(loginData: LoginFormData) {
        let user = new User(loginData.email, loginData.password);
        this.authService.signIn(user)
            .then((resp: Response) => {
                if (resp) {
                    console.log('Connected!');
                }
            })
    }

    render() {
        const errorLabel = <Label color="red" pointing />
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Header as="h2" textAlign="center">
                        Login
                    </Header>
                    <Segment>
                        <Form
                            size="large"
                            onValidSubmit={(formData: LoginFormData) => this.submit(formData)}>
                            <Form.Input
                                name="email"
                                label="email"
                                required
                                fluid
                                icon="user"
                                iconPosition="left"
                                placeholder="Email address"
                                validations="isEmail"
                                validationErrors={{
                                    isEmail: 'Email not valid',
                                    isDefaultRequiredValue: 'Email is required'
                                }}
                                errorLabel={ errorLabel }
                            />
                            <Form.Input
                                name="password"
                                label="password"
                                required
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                validations={{ minLength: 8 }}
                                validationErrors={{
                                    minLength: 'Minimum of 8 characters',
                                    isDefaultRequiredValue: 'Password is required'
                                }}
                                errorLabel={ errorLabel }
                            />
                            <Button
                                color="blue"
                                fluid
                                size="large"
                                type="submit">
                                    Sign in
                            </Button>
                        </Form>
                    </Segment>
                    <Message>
                        Not registered yet ? <Link to="/signup">Sign up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}
