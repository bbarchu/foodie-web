import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';


class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id:this.props.location.props.product.id,
                name:this.props.location.props.product.name,
                description:this.props.location.props.product.description,
                price:this.props.location.props.product.price,
                shop: this.props.location.props.shop
            },
            errors:{}
            
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
    
      formIsValid(){
        const _errors = {};
        if(!this.state.product.name) _errors.name= "Name is required";
        if(!this.state.product.price) _errors.price= "Price is required";
        if(!this.state.product.description) _errors.description= "Description is required";
    
    
        this.state.errors = _errors
        return Object.keys(this.state.errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();        
        //if(!this.formIsValid()) return;
        toast.success("Succesfull edit!");

    }


    handleChange({target}) {
        this.setState({product: target.value});
        //this.setState({value: event.target.value});
    }

    

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor={this.state.product.id}> Id </label>
                    <div className="field">
                        <input 
                        id="id"
                        label="Id"
                        type="text" 
                        name="id" 
                        value={ this.state.product.id } 
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
                value={this.state.product.name}
                onChange={this.handleChange}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.product.description}
                onChange={this.handleChange}

                />
                
                <TextInput
                id="price"
                label="Price"
                name="price"
                value={this.state.product.price}
                onChange={this.handleChange}

                />
                

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditProduct;