import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/**
 * Navbar component.
 */
export class NavBar extends Component {
    // State initialization.
    state = { activeItem: 'home' };

    render() {
        return(
            <div>
                <Menu pointing>
                    <Menu.Item as={ Link }
                        name='home'
                        to='/'
                    />
                    <Menu.Item as={ Link }
                        name='Se connecter'
                        to='/signin'
                    />
                    <Menu.Item as={ Link }
                        name='Mon compte'
                        to='/account'
                    />
                    <Menu.Item as={ Link }
                        name='Sondages'
                        to='/polls'
                    />
                </Menu>
            </div>
        )
    }
}
