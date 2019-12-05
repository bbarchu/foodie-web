import React from 'react';
import { NavLink } from 'react-router-dom';
import {Nav, Navbar, NavDropdown}  from 'react-bootstrap';

function Header(props) {
    const activeStyle = { color: "black"};
    const pathname = props.location.pathname;

    function HeaderWithRouter (){
        
        if ( pathname !== "/" ){
            return true
        }
        return false
        }
        

        return (
        
        <div>{HeaderWithRouter() &&

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/home">Foodie</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Shops" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/shops">Shops</NavDropdown.Item>
                            <NavDropdown.Item href="/shops_map">Map</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <NavDropdown title="Deliveries" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/deliveries_status">Status</NavDropdown.Item>
                        <NavDropdown.Item href="/deliveries_map">Map action</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/balance">Balance</Nav.Link>
                    <Nav.Link href="/suscription">Suscription</Nav.Link>
                    <Nav.Link href="/orders">Orders</Nav.Link>
                    <Nav.Link href="/rules">Rules</Nav.Link>
                    <Nav.Link href="/stats">Stats</Nav.Link>                        
                    <Nav.Link href="/about">About</Nav.Link>                        
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>


            
        
        }
        </div>
        
        
    );
}

export default Header;