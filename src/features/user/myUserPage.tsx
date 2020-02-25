import { UserHttpService } from "../../services/http/userHttpService";
import { Grid, Header, Form, Segment, Button, Label } from "semantic-ui-react";
import React from "react";
import { ResponseUserLinksData, User } from "../../models/User";

/**
 * State User with all data needed for a user.
 */
type stateUser = {
    shouldRedirect: boolean,
    response: ResponseUserLinksData
}

/**
 * Class my user page.
 */
export class MyUserPage extends React.Component<{}, stateUser> {
    private userService: UserHttpService;
    constructor(props: any) {
        super(props);
        this.state = {
            shouldRedirect: false,
            response: {
                user: null,
                links: []
            }
        };
        this.userService = new UserHttpService();
    }

    /**
     * Initiate the state user with his data.
     */
    componentDidMount() {
        this.userService.getMyUser().then(resp => {
            this.setState({
                response: resp
            });
        });
    }

    /**
     * Update state after a input is change
     */
    handleChange = (event: any) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        const { _id, email, name, password, confirmPassword, role } = this.state.response.user;

        switch (inputName) {
            case "email": ;
                this.setState({
                    response: {
                        user: {
                            _id: _id,
                            email: inputValue,
                            name: name,
                            password: password,
                            confirmPassword: confirmPassword,
                            role: role
                        },
                        links: []
                    }
                });
                break;
            case 'name':
                this.setState({
                    response: {
                        user: {
                            _id: _id,
                            email: email,
                            name: inputValue,
                            password: password,
                            confirmPassword: confirmPassword,
                            role: role
                        },
                        links: []
                    }
                });
                break;
            case 'password':
                this.setState({
                    response: {
                        user: {
                            _id: _id,
                            email: email,
                            name: name,
                            password: inputValue,
                            confirmPassword: confirmPassword,
                            role: role
                        },
                        links: []
                    }
                });
                break;
            case 'confirmPassword':
                this.setState({
                    response: {
                        user: {
                            _id: _id,
                            email: email,
                            name: name,
                            password: password,
                            confirmPassword: inputValue,
                            role: role
                        },
                        links: []
                    }
                });
                break;

            default:
                break;
        }
    };

    /**
     * Update data user.  
     * 
     * @param userData Data from the form
     */
    handleSubmit = () => {
        if (this.state.response.user != null) {
            if ((this.state.response.user.password === this.state.response.user.confirmPassword) || (this.state.response.user.password == undefined && this.state.response.user.confirmPassword == undefined)) {
                const { _id, email, name, password } = this.state.response.user;
                const user = new User(email, password);

                user._id = _id;
                user.name = name;

                this.userService.updateUser(user);
            }
        }
    }

    render() {
        const errorLabel = <Label color="red" pointing />

        if (this.state.response.user != null) {
            const { email, name } = this.state.response.user;

            return (
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Header as="h2" textAlign="center">
                            Mon compte
                        </Header>
                        <Segment>
                            <Form
                                size="large"
                            >
                                <Form.Input
                                    name="email"
                                    label="email"
                                    defaultValue={email}
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    // validations="isEmail"
                                    // validationerrors={{
                                    //     isEmail: 'Email not valid',
                                    //     isDefaultRequiredValue: 'Email is required'
                                    // }}
                                    // errorlabel={errorLabel}
                                />
                                <Form.Input
                                    name="name"
                                    label="name"
                                    defaultValue={name}
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                    // validations={{
                                    //     minLength: 3,
                                    //     maxLength: 30
                                    // }}
                                    // validationerrors={{
                                    //     isEmptyString: 'Name can\'t be empty',
                                    //     minLength: 'Minimum of 3 characters',
                                    //     maxLength: 'Maximum of 30 characters',
                                    //     isDefaultRequiredValue: 'Name is required'
                                    // }}
                                    // errorlabel={errorLabel}
                                />
                                <Form.Input
                                    name="password"
                                    label="password"
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    type="password"
                                    // validations={{
                                    //     comparePass: (values: UpdateUserFormData, value: string) => {
                                    //         if (values.confirmPassword && values.confirmPassword.length > 8) {
                                    //             return values.confirmPassword === value ? true : false
                                    //         }
                                    //         return true
                                    //     },
                                    //     minLength: 8
                                    // }}
                                    // validationerrors={{
                                    //     minLength: 'Minimum of 8 characters',
                                    //     isDefaultRequiredValue: 'Password is required',
                                    //     comparePass: 'Passwords aren\'t the same'
                                    // }}
                                    // errorlabel={errorLabel}
                                />
                                <Form.Input
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    type="password"
                                    // validations={{
                                    //     comparePass: (values: UpdateUserFormData, value: string) => {
                                    //         if (values.password && values.password.length > 8) {
                                    //             return values.password === value ? true : false
                                    //         }
                                    //         return true
                                    //     },
                                    //     minLength: 8
                                    // }}
                                    // validationerrors={{
                                    //     minLength: 'Minimum of 8 characters',
                                    //     isDefaultRequiredValue: 'Password is required',
                                    //     comparePass: 'Passwords aren\'t the same'
                                    // }}
                                    // errorlabel={errorLabel}
                                />
                                <Button
                                    color="blue"
                                    fluid
                                    size="large"
                                    //type="submit">
                                    onClick={this.handleSubmit}>
                                    Mettre à jour
                                </Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            )
        }

        return (
            <></>
        )
    }
}
