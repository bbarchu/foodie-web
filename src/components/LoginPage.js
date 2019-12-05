import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import url from './common/apilink.json';
import manejadorErrores from './common/manejadorErrores';

function LoginPage(props) {
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        email:"",
        contrasenia:""
    });

    function handleChange({target}){
        const updatedUser = { ...user, [target.name]: target.value};
        setUser(updatedUser);
    }

    function handleSubmit(event){

        event.preventDefault();
        if(!formIsValid()) return;
        fetch(url.BASE_URL + '/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: user.contrasenia

            })
        }).then((res) => { 
            if(res.ok){
                toast.success("Conection success!");
                props.history.push("/home");      
            }
            else {
               manejadorErrores(res.status);
            }
        }).catch((error) => console.log("hubo un problema" + error.message));
    }

   

    function formIsValid(){
        const _errors = {};
        if(!user.email) _errors.email= "Email is required";
        if(!user.contrasenia) _errors.contrasenia= "Password is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <div className="container-fluid">
        <ToastContainer autoClose={4000} hideProgressBar />
        <React.Fragment>
        <h1>Login to foodie</h1>
        <form onSubmit={handleSubmit}>
                    
            <TextInput
            id="email"
            label="E-mail"
            name="email"
            value={user.email}
            onChange={handleChange}
            error={errors.email}

            />

            <TextInput
            id="contrasenia"
            label="Contraseña"
            name="contrasenia"
            value={user.contrasenia}
            onChange={handleChange}
            error={errors.contrasenia}
            type={"password"}

            />

            <input type="submit" value="Log in!" className="btn btn-primary" />

        </form>
        </React.Fragment>
        </div>
    );
}

export default withRouter(LoginPage);