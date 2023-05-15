import React from 'react';
import { Link } from 'react-router-dom';

export  default function Navbar() {
    return (
    <nav className="nav">
        <div className="nav__logo">
            <Link  to="/" className="site-title">Site Name</Link>
        </div>
        <div className="nav__menu">
            <ul className="menu">
                <li className="menu__item">
                    <Link to="/" className="menu__link">Home</Link>
                </li>
                <li className="menu__item"> 
                    <Link to="/routes" className="menu__link">Routes</Link>
                </li>
                <li className="menu__item">
                    <Link to="/how-to-ride" className="menu__link">How To Ride</Link>
                </li>
            </ul>
        </div>
    </nav>
    );
}