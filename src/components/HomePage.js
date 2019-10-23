import React from "react";
import { Link } from 'react-router-dom';

function HomePage(){
    return (<div className="jumbotron">
        <h1> Foodie administration </h1>
        <p> Administra tu aplicación </p>
        <Link to="about" className="btn btn-primary">About</Link>
    </div>
    );
}

export default HomePage;