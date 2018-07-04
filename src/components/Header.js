import React from 'react';
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h1 className="heading heading--main">
                <Link to="/">
                Phone Phax
                </Link>
            </h1>
        </header>
    )
}

export default Header;