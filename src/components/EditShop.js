import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';


class EditShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: {
                id:this.props.location.props.shop.id,
                name:this.props.location.props.shop.name,
                description:this.props.location.props.shop.description,
                address:this.props.location.props.shop.address,
                location:this.props.location.props.shop.location,
                category:this.props.location.props.shop.category
            },
            errors:{}
            
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
    
      formIsValid(){
        const _errors = {};
        if(!this.state.shop.name) _errors.name= "Name is required";
        if(!this.state.shop.category) _errors.category= "Category is required";
        if(!this.state.shop.location) _errors.location= "Location is required";
        if(!this.state.shop.address) _errors.address= "Address is required";
        if(!this.state.shop.description) _errors.description= "Description is required";
    
    
        this.state.errors = _errors
        return Object.keys(this.state.errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();        
        //if(!this.formIsValid()) return;
        toast.success("Succesfull edit!");

    }


    handleChange({target}) {
        this.setState({shop: target.value});
        //this.setState({value: event.target.value});
    }

    

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor={this.state.shop.id}> Id </label>
                    <div className="field">
                        <input 
                        id="id"
                        label="Id"
                        type="text" 
                        name="id" 
                        value={ this.state.shop.id } 
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
                value={this.state.shop.name}
                onChange={this.handleChange}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.shop.description}
                onChange={this.handleChange}

                />
                
                <TextInput
                id="address"
                label="Address"
                name="address"
                value={this.state.shop.address}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="location"
                label="Location"
                name="location"
                value={this.state.shop.location}
                onChange={this.handleChange}

                />
                    
                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.shop.category}
                onChange={this.handleChange}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditShop;