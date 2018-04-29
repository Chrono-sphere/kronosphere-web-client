import React from 'react';
import LoginBox from 'Components/LoginBox/LoginBox';
import './Login.scss';

const Login = () => {
    return (
        <div className="login-container">
            <div className="version">v0.0.1</div>
            <LoginBox />
        </div>
    )
}

export default Login;
