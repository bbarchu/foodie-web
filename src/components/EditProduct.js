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
                category:this.props.location.props.product.category,
                shop: this.props.location.props.shop.id
            },
            errors:{}
            
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

      }
    
    
      formIsValid(){
        const _errors = {};
        if(!this.state.product.name) _errors.name= "Name is required";
        if(!this.state.product.category) _errors.category= "Category is required";
        if(!this.state.product.price) _errors.price= "Price is required";
        if(!this.state.product.description) _errors.description= "Description is required";

        this.setState({...this.state, ...{ errors: _errors}});
        return Object.keys(_errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();
        if(!this.formIsValid()) return;
        fetch('http://taller2-back.herokuapp.com/api/admin/products', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.product.id,
                shop_id:this.state.product.shop,
                price:this.state.product.price,
                category: this.state.product.category,
                name: this.state.product.name,
                description: this.state.product.description

            })
        }).then(() => { 
            toast.success("Successfull edit!");
        }).catch((e) => console.log(e));

    }


    handleChangeName({target}) {
        const product = this.state.product
        const update = { name : target.value}
        const newProduct = { ...product, ...update }
        this.setState({...this.state, ...{ product: newProduct}});
    }

    handleChangeDescription({target}) {
        const product = this.state.product
        const update = { description : target.value}
        const newProduct = { ...product, ...update }
        this.setState({...this.state, ...{ product: newProduct}});
    }

    handleChangeCategory({target}) {
        const product = this.state.product
        const update = { category : target.value}
        const newProduct = { ...product, ...update }
        this.setState({...this.state, ...{ product: newProduct}});
    }

    handleChangePrice({target}) {
        const product = this.state.product
        const update = { price : target.value}
        const newProduct = { ...product, ...update }
        this.setState({...this.state, ...{ product: newProduct}});
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
                error={this.state.errors.name}
                onChange={this.handleChangeName}

                />
                    
                
                <TextInput
                id="description"
                label="Description"
                name="description"
                value={this.state.product.description}
                error={this.state.errors.description}
                onChange={this.handleChangeDescription}

                />
                
                <TextInput
                id="price"
                label="Price"
                name="price"
                value={this.state.product.price}
                onChange={this.handleChangePrice}
                error={this.state.errors.price}

                />

                <TextInput
                id="category"
                label="Category"
                name="category"
                value={this.state.product.category}
                onChange={this.handleChangeCategory}
                error={this.state.errors.category}

                />
                

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditProduct;