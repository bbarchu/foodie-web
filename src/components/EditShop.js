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
    
    
        this.setState({...this.state, ...{ errors: _errors}});
        return Object.keys(_errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.shop)  
        console.log(this.state.shop.id)        
        if(!this.formIsValid()) return;
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
        const shop = this.state.shop
        const update = { name : target.value}
        const newShop = { ...shop, ...update }
        this.setState({...this.state, ...{ shop: newShop}});
    }
    handleChangeAddress({target}) {
        const shop = this.state.shop
        const update = { address : target.value}
        const newShop = { ...shop, ...update }
        this.setState({...this.state, ...{ shop: newShop}});
    }
    handleChangeLocation({target}) {
        const shop = this.state.shop
        const update = { location : target.value}
        const newShop = { ...shop, ...update }
        this.setState({...this.state, ...{ shop: newShop}});
    }
    handleChangeCategory({target}) {
        const shop = this.state.shop
        const update = { category : target.value}
        const newShop = { ...shop, ...update }
        this.setState({...this.state, ...{ shop: newShop}});
    }
    handleChangeDescription({target}) {
        const shop = this.state.shop
        const update = { description : target.value}
        const newShop = { ...shop, ...update }
        this.setState({...this.state, ...{ shop: newShop}});
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
                error={this.state.errors.name}
                onChange={this.handleChangeName}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.shop.description}
                error={this.state.errors.description}
                onChange={this.handleChangeDescription}

                />
                
                <TextInput
                id="address"
                label="Address"
                name="address"
                value={this.state.shop.address}
                error={this.state.errors.address}
                onChange={this.handleChangeAddress}

                />
                    
                <TextInput
                id="location"
                label="Location"
                name="location"
                value={this.state.shop.location}
                onChange={this.handleChangeLocation}
                error={this.state.errors.location}


                />
                    
                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.shop.category}
                error={this.state.errors.category}
                onChange={this.handleChangeCategory}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditShop;