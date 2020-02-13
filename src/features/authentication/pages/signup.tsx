import React, { Component } from 'react';
import { Button, Grid, Segment, Message, Header, Label} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { Form } from 'formsy-semantic-ui-react';
import { AuthHttpService } from '../../../services/http/authHttpService';
import { User } from '../../../models/User';

type SignUpFormData = {
    email: string,
    password: string,
    name: string,
    confirmPassword: string
}

/**
 * Signup page.
 */
export class SignUpPage extends Component {
    authService = new AuthHttpService();

    // Initialize state
    state = {
        shouldRedirect: false
    }

    submit(formData: SignUpFormData) {
        let user = new User(formData.email, formData.password);
        user.name = formData.name; 
        this.authService.signUp(user)
            .then((resp: boolean) => {
                // Manage resp
                if (resp) {
                    // Redirect on signin page
                    this.setState({
                        shouldRedirect: true
                    })
                }
            })
    }

    render() {
        const errorLabel = <Label color="red" pointing />
        if (this.state.shouldRedirect) {
            return (
                <Redirect to="/signin" />
            )
        } else {
            return(
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center">
                            Register
                        </Header>
                        <Segment>
                            <Form
                                size="large"
                                onValidSubmit={(formData: SignUpFormData) => this.submit(formData) }>
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
                                    name="name"
                                    label="name"
                                    required
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Name"
                                    validations={{ 
                                        minLength: 3,
                                        maxLength: 30
                                    }}
                                    validationErrors={{
                                        isEmptyString: 'Name can\'t be empty',
                                        minLength: 'Minimum of 3 characters',
                                        maxLength: 'Maximum of 30 characters',
                                        isDefaultRequiredValue: 'Name is required'
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
                                    validations={{
                                        comparePass: function(values: SignUpFormData, value: string) {
                                            if (values.confirmPassword && values.confirmPassword.length > 8) {
                                                return values.confirmPassword === value ? true : false
                                            }
                                            return true
                                        },
                                        minLength: 8
                                    }}
                                    validationErrors={{
                                        minLength: 'Minimum of 8 characters',
                                        isDefaultRequiredValue: 'Password is required',
                                        comparePass: 'Passwords aren\'t the same' 
                                    }}
                                    errorLabel={ errorLabel }
                                />
                                <Form.Input
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    required
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    type="password"
                                    validations={{
                                        comparePass: function(values: SignUpFormData, value: string) {
                                            if (values.password && values.password.length > 8) {
                                                return values.password === value ? true : false
                                            }
                                           return true
                                        },
                                        minLength: 8
                                    }}
                                    validationErrors={{
                                        minLength: 'Minimum of 8 characters',
                                        isDefaultRequiredValue: 'Password is required',
                                        comparePass: 'Passwords aren\'t the same' 
                                    }}
                                    errorLabel={ errorLabel }
                                />
                                <Button
                                    color="blue"
                                    fluid
                                    size="large"
                                    type="submit">
                                        Sign up
                                </Button>
                            </Form>
                        </Segment>
                        <Message>
                            Already member? <Link to="/signin">Sign in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            );
        }
    }
}
