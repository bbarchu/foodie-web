import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:this.props.location.props.user.id,
                name:this.props.location.props.user.name,
                surname:this.props.location.props.user.surname,
                email:this.props.location.props.user.email,
                phone:this.props.location.props.user.phone,
                password:this.props.location.props.user.password,
                role:this.props.location.props.user.role,
                subscription:this.props.location.props.user.subscription,
                photo_url:this.props.location.props.user.photo_url
            },
            errors:{}
            
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
    
      formIsValid(){
        const _errors = {};
        if(!this.state.user.name) _errors.name= "Name is required";
    
        this.state.errors = _errors
        return Object.keys(this.state.errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();        
        //if(!this.formIsValid()) return;
        toast.success("Succesfull edit!");

    }


    handleChange({target}) {
        this.setState({user: target.value});
        //this.setState({value: event.target.value});
    }

    

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <TextInput
                id="name"
                label="Name"
                name="name"
                value={this.state.user.name}
                onChange={this.handleChange}

                />
                    
                
                <TextInput
                id="surname"
                label="Surname"
                name="surname"
                value={this.state.user.surname}
                onChange={this.handleChange}

                />
                
                <TextInput
                id="email"
                label="Email"
                name="email"
                value={this.state.user.email}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="phone"
                label="phone"
                name="phone"
                value={this.state.user.phone}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="password"
                label="Password"
                name="password"
                value={this.state.user.password}
                onChange={this.handleChange}

                />

                <TextInput
                id="role"
                label="Role"
                name="role"
                value={this.state.user.role}
                onChange={this.handleChange}

                />

                <TextInput
                id="subscription"
                label="Subscription"
                name="subscription"
                value={this.state.user.subscription}
                onChange={this.handleChange}

                />

                <TextInput
                id="photo_url"
                label="photo_url"
                name="photo_url"
                value={this.state.user.photo_url}
                onChange={this.handleChange}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditUser;