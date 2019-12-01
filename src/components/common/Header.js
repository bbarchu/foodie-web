import React from 'react';
import { NavLink } from 'react-router-dom';

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
            <nav>
            <NavLink activeStyle={activeStyle} to="/home" >Home</NavLink> {" | "} 
            <NavLink activeStyle={activeStyle} to="/shops">Shops</NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/shops_map">ShopsMaps</NavLink> {" | "}  
            <NavLink activeStyle={activeStyle} to="/users"> Users </NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/deliveries_status"> Deliveries </NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/deliveries_map"> Deliveries Map</NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/balance"> Balance  </NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/suscription"> Manage Suscription  </NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/stats"> Stats  </NavLink> {" | "}
            <NavLink activeStyle={activeStyle} to="/about"> About </NavLink>
        </nav>
        
        }
        </div>
        
        
    );
}

export default Header;