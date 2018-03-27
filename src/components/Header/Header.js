import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {

    render() {
        return (
            <nav>
                <div className="nav-wrapper header">
                    <Link to="/" className="brand-logo center">
                        Time's Up
                    </Link>
                </div>
            </nav>
        );
    }
}

export default Header;
