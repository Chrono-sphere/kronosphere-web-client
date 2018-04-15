import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import LoginMutation from 'Mutations/Login';
import CurrentUserQuery from 'Queries/CurrentUser';
import { Routes } from '../App';

import './LoginBox.scss';

class LoginBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    onSubmit() {
        let { email, password } = this.state;

        // so the form does not submit itself
        event.preventDefault();

        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query: CurrentUserQuery }]
        });
    }

    emailChangeHandler(event) {
        this.setState({ email: event.target.value }).then(() => {
            console.log('Current State', this.state);
        });
    }

    passwordChangeHandler(event) {
        this.setState({ password: event.target.value }).then(() => {
            console.log('Current State', this.state);
        });
    }

    /**
     * Based on if an active cookie for a logged in user exists, we direct to then
     * dashboard or show the login box
     * @return {React.Component | Route} Component or Route(component) to render
     */
    renderRoute() {
        const { user, loading } = this.props.data;

        if(loading) {
            return (
                <div>
                    <img src="./src/assets/Ripple-1s-200px.gif" />
                </div>
            )
        }
        else if(!loading && !user) {
            return (
                <div className="loginbox-container">
                    <form className="loginbox-form" id="loginbox" onSubmit={ this.onSubmit.bind(this) }>
                        <input
                            type="text"
                            className="loginbox-input"
                            placeholder="Username"
                            onChange={ this.emailChangeHandler.bind(this) }/>
                        <input
                            type="password"
                            className="loginbox-input"
                            placeholder="Password"
                            onChange={ this.passwordChangeHandler.bind(this) }/>
                        <button type="submit" form="loginbox" className="btn-large">Sign in</button>
                    </form>
                </div>
            );
        }
        else {
            return (<Redirect to={ Routes.Dashboard } />);
        }
    }

    render() {
        return this.renderRoute();
    }
}

export default graphql(LoginMutation)(
    graphql(CurrentUserQuery)(LoginBox)
);
