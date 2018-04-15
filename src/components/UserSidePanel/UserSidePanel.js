import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import UserCircleImage from 'Components/UserCircleImage/UserCircleImage';
import CountMetric from 'Components/CountMetric/CountMetric';
import LogoutMutation from 'Mutations/Logout';
import CurrentUserQuery from 'Queries/CurrentUser';

import './UserSidePanel.scss';

class UserSidePanel extends Component {

    constructor(props) {
        super();
        this.userCoverImage = props.userCoverImage;
        this.userProfileImage = props.userProfileImage;
        this.userName = props.userName;

        this.styles = {
            backgroundImage: `url(${ this.userCoverImage })`
        };
    }

    logout() {
        this.props.mutate({
            variables: {},
            refetchQueries: [{ query: CurrentUserQuery }]
        });
    }

    render() {
        return (
            <div className="user-side-panel">
                <div className="user-cover-image" style={ this.styles }>
                </div>

                <div className="user-profile-and-name">
                    <div className="user-circle-image-container">
                        <UserCircleImage profileImage={ this.userProfileImage }/>
                    </div>
                    <div className="user-name">
                        { this.userName }
                    </div>
                </div>

                <div className="recent-activity">
                    <div className="recent-activity-header">
                        This week
                    </div>
                    <hr />
                    <div className="recent-activity-metrics">
                        <CountMetric title="Active" value="12" backgroundColor="green"/>
                        <CountMetric title="Complete" value="25" backgroundColor="yellow"/>
                    </div>
                </div>

                <div className="logout-container">
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={ this.logout.bind(this) }>Logout
                        <i className="material-icons right">airline_seat_individual_suite</i>
                    </button>
                </div>
            </div>
        )
    }
}

export default graphql(LogoutMutation)(
    graphql(CurrentUserQuery)(UserSidePanel)
);
