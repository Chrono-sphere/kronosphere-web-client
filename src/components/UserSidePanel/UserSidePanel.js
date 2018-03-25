import React, { Component } from 'react';
import UserCircleImage from 'Components/UserCircleImage/UserCircleImage';

import './UserSidePanel.css';

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
    
    render() {
        return (
            <div className="user-side-panel">
                <div className="user-cover-image" style={ this.styles }>
                </div>
                
                <div className="user-profile-and-name">
                    <div className="user-circle-image-container">
                        <UserCircleImage profileImage={ this.userProfileImage }/>
                    </div>
                    <div class="user-name">
                        { this.userName }
                    </div>
                </div>
            </div>
        )
    }
}

export default UserSidePanel;
