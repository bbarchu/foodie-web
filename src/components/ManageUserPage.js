import React, {useState} from 'react';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import url from './common/apilink.json';

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
        photo_url: "http://asd.com"
    });

    function handleChange({target}){
        const updatedUser = { ...user, [target.name]: target.value};
        setUser(updatedUser);
    }

    function handleSubmit(event){
        event.preventDefault();
        
        if(!formIsValid()) return;

        fetch(url.BASE_URL + '/api/new_user', {
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
        }).then((res) => {
            if (res.ok){
                props.history.push("/users");
                toast.success("User was added!")
            }
            else{
                toast.error("Can't add user")
                return res.json()              
            }
        }).then((resjson) => {
            
            const _errors = {};
            if(resjson.name) _errors.name= resjson.name[0];
            if(resjson.surname) _errors.surname= resjson.surname[0];
            if(resjson.email) _errors.email= resjson.email[0];
            if(resjson.phone) _errors.phone= resjson.phone[0];
            if(resjson.password) _errors.password= resjson.password[0];
            if(resjson.role) _errors.role= resjson.role[0];
            if(resjson.subscription) _errors.subscription= resjson.subscription[0];
            setErrors(_errors);
        })
        .catch((e) => console.log(e));

    }

    function formIsValid(){
        const _errors = {};
        if(!user.name) _errors.name= "Name is required";
        if(!user.surname) _errors.surname= "Surname is required";
        if(!user.email) _errors.email= "Emailame is required";
        if(!user.phone) _errors.phone= "Phone is required";
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