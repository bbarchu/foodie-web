import React from "react";
import { Link } from 'react-router-dom';

function HomePage(){
    return (<div className="jumbotron">
        <h1> Foodie administration </h1>
        <p> Administra tu aplicación </p>
        <Link to="shops" className="btn btn-primary">Shops </Link>
        {" "}<Link to="users" className="btn btn-primary">Users</Link>
        {" "}<Link to="login" className="btn btn-primary">LoginDummy</Link>

    </div>
    );
}

export default HomePage;