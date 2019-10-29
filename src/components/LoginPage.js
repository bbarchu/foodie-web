import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';


function LoginPage() {
    
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
        fetch('http://taller2-back.herokuapp.com/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: user.contrasenia

            })
        }).then(() => {             
            toast.success("Conection success!");
        }).catch((e) => console.log(e));
    }

    function formIsValid(){
        const _errors = {};
        if(!user.email) _errors.email= "Email is required";
        if(!user.contrasenia) _errors.contrasenia= "Password is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
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
    );
}

export default withRouter(LoginPage);