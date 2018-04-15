import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Header from 'Components/Header/Header';
import UserSidePanel from 'Components/UserSidePanel/UserSidePanel';
import CurrentUserQuery from 'Queries/CurrentUser';
import { Redirect } from 'react-router-dom';
import { Routes } from '../App';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    renderContent() {
        const { user, loading } = this.props.data;

        if(loading) {
            return (<div>Loading...</div>);
        }
        else if(!loading & !user) {
            return (<Redirect to={ Routes.Root } />);
        }
        else {
            return (
                <div className="container">
                    <Header />
                    <UserSidePanel
                        userCoverImage="https://loremflickr.com/320/240"
                        userProfileImage="http://static.businessinsider.com/image/595141eda3630f62588b5117-750.jpg"
                        userName="Richard Henricks"
                        />
                    { this.props.children }
                </div>
            );
        }
    }

    render() {
        return this.renderContent();
    }
}

export default graphql(CurrentUserQuery)(Dashboard);
