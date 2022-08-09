import React, { Component } from 'react';
import '../style/Style.css';
import { Link } from 'react-router-dom';

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const myData = {update: false}
        return (
            <div>
                <header className='header'>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="/" className="navbar-brand navbar-brand-text">Album Management App</a></div>
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/form" state={myData} className="nav-link" >Upload</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                className="nav-link dropdown-toggle"
                                to="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                >
                                Dropdown link
                                </Link>
                                <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdownMenuLink"
                                >
                                <Link className="dropdown-item" to="#">
                                    Action
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    Another action
                                </Link>
                                <Link className="dropdown-item" to="#">
                                    Something else here
                                </Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}