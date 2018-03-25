import React from 'react';
import Header from './Header/Header';
import UserSidePanel from './UserSidePanel/UserSidePanel';

const App = (props) => {
    return (
        <div className="container">
            <Header />
            <UserSidePanel />
            { props.children }
        </div>
    );
}

export default App;
