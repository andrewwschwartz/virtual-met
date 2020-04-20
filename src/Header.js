import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import './Header.css'
import { Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <Navbar>
            <div id="header-content">
                <Link to="/">
                <h1>The Virtual MET</h1>
                <p>by Andrew Schwartz</p>
                </Link>
            </div>
        </Navbar>
    );
}
