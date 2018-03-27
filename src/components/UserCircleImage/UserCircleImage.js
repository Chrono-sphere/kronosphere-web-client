import React from 'react';
import './UserCircleImage.css';

const UserCircleImage = (props) => {

    let styles = {
        backgroundImage: `url(${ props.profileImage })`
    };

    return (
        <div className="user-circle-image" style={ styles }>
        </div>
    );
}

export default UserCircleImage;
