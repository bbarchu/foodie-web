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
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log(this.state.shop)  
        console.log(this.state.shop.id)        
        //if(!this.formIsValid()) return;
        fetch('http://taller2-back.herokuapp.com/api/admin/shops', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.shop.id,
                address: this.state.shop.address,
                location: this.state.shop.location,
                category: this.state.shop.category,
                name: this.state.shop.name,
                description: this.state.shop.description

            })
        }).then(() => { 
            toast.success("Successfull edit");
        }).catch((e) => console.log(e));


    }


    handleChangeName({target}) {
        this.setState({...this.state.shop, name : target.value});
    }
    handleChangeAddress({target}) {
        this.setState({...this.state.shop, address: target.value});
    }
    handleChangeLocation({target}) {
        this.setState({...this.state.shop, location: target.value});
    }
    handleChangeCategory({target}) {
        this.setState({...this.state.shop, category: target.value});
    }
    handleChangeDescription({target}) {
        this.setState({...this.state.shop, description: target.value});
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
                onChange={this.handleChangeName}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.shop.description}
                onChange={this.handleChangeDescription}

                />
                
                <TextInput
                id="address"
                label="Address"
                name="address"
                value={this.state.shop.address}
                onChange={this.handleChangeAddress}

                />
                    
                <TextInput
                id="location"
                label="Location"
                name="location"
                value={this.state.shop.location}
                onChange={this.handleChangeLocation}

                />
                    
                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.shop.category}
                onChange={this.handleChangeCategory}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditShop;