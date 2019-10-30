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
                <div className="form-group">
                    <label htmlFor={this.state.user.id}> Id </label>
                    <div className="field">
                        <input 
                        id="id"
                        label="Id"
                        type="text" 
                        name="id" 
                        value={ this.state.user.id } 
                        onChange={this.handleChange}
                        className="form-control"
                        readOnly
                        />
                    </div>
                </div>

                <TextInput
                id="name"
                label="Name"
                name="name"
                value={this.state.user.name}
                onChange={this.handleChange}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.user.description}
                onChange={this.handleChange}

                />
                
                <TextInput
                id="address"
                label="Address"
                name="address"
                value={this.state.user.address}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="location"
                label="Location"
                name="location"
                value={this.state.user.location}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.user.category}
                onChange={this.handleChange}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditUser;