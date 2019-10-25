import React, {useState} from 'react';
import UserForm from './UserForm';
import { toast } from 'react-toastify';

const ManageUserPage = props => {
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        id:null,
        slug:"",
        name: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        subscription: "",
        photo_url: ""
    });

    function handleChange({target}){
        const updatedUser = { ...user, [target.name]: target.value};
        setUser(updatedUser);
    }

    function handleSubmit(event){
        event.preventDefault();
        
        if(!formIsValid()) return;

        fetch('http://taller2-back.herokuapp.com/api/admin/users', {
            method: 'POST',
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
                password: user.password,
                role: user.role,
                subscription: user.subscription,
                photo_url: user.photo_url
            })
        }).then(() => { 
            props.history.push("/users");
            toast.success("User was added!");
        }).catch((e) => console.log(e));

    }

    function formIsValid(){
        const _errors = {};
        if(!user.name) _errors.name= "Name is required";
        if(!user.surname) _errors.surname= "Surname is required";
        if(!user.email) _errors.email= "Emailame is required";
        if(!user.phone) _errors.name= "Phone is required";
        if(!user.password) _errors.password= "Password is required";
        if(!user.role) _errors.role= "Role is required";
        if(!user.subscription) _errors.subscription= "Subscription is required";
      
        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <React.Fragment>
            <h2> Add User</h2>
            <UserForm 
            user={user}
            onChange={handleChange}
            errors={errors}
            onSubmit={handleSubmit}/>
        </React.Fragment>
    )
}

export default ManageUserPage;