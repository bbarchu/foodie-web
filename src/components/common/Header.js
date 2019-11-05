import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    const activeStyle = { color: "black"};
    return (
        <nav>
            <NavLink activeStyle={activeStyle} to="/home" >Home</NavLink> | <NavLink activeStyle={activeStyle} to="/shops">Shops</NavLink>
            {" | "} <NavLink activeStyle={activeStyle} to="/users"> Users </NavLink> {" | "}<NavLink activeStyle={activeStyle} to="/about"> About </NavLink>
        </nav>
    );
}

export default Header;