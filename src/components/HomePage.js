import React from "react";
import { Link } from 'react-router-dom';

function HomePage(){
    return (<div className="jumbotron">
        <h1> Foodie administration </h1>
        <p> Administra tu aplicación </p>
        <Link to="shops" className="btn btn-dark">Shops </Link>
        {" "}<Link to="users" className="btn btn-dark">Users</Link>
        {" "}<Link to="deliveries_status" className="btn btn-dark">Deliveries</Link>
        {" "}<Link to="balance" className="btn btn-dark">Balance</Link>

    </div>
    );
}

export default HomePage;