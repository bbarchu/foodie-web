import React, { useState } from 'react';
import TextInput from './common/TextInput';

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
            }
            
        }
        this.handleChange = this.handleChange.bind(this);
      }
    
    
    componentWillMount(){
        
        
    }


    handleChange({target}) {
        this.setState({shop: target.value});
        //this.setState({value: event.target.value});
    }

    

    render(){
        return (
            <form >
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

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.shop.description}

                />
                
                <TextInput
                id="address"
                label="Address"
                name="address"
                value={this.state.shop.address}

                />
                    
                <TextInput
                id="location"
                label="Location"
                name="location"
                value={this.state.shop.location}

                />
                    
                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.shop.category}

                />

            </form>
        );
    }
    
}

export default EditShop;