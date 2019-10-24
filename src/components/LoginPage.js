import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';


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
        toast.success("Conection success!");
    }

    function formIsValid(){
        const _errors = {};
        if(!user.email) _errors.email= "Email is required";
        if(!user.contrasenia) _errors.contrasenia= "Password is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
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

            />

            <input type="submit" value="Log in!" className="btn btn-primary" />

        </form>
    );
}

export default LoginPage;