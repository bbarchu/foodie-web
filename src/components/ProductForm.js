import React from 'react';
import TextInput from './common/TextInput';

function ProductForm(props) {
    return ( 
      <form onSubmit={props.onSubmit}>
                
        <TextInput
        id="name"
        label="Name"
        name="name"
        value={props.product.name}
        onChange={props.onChange}
        error={props.errors.name}

        />
             
          
        <TextInput
        id="description"
        label="Description"
        name="description"
        value={props.product.description}
        onChange={props.onChange}
        error={props.errors.description}

        />
           
        <TextInput
        id="price"
        label="Price"
        name="price"
        value={props.product.price}
        onChange={props.onChange}
        error={props.errors.price}

        />
             
             
        <TextInput
        id="category"
        label="Category"
        name="category"
        value={props.product.category}
        onChange={props.onChange}
        error={props.errors.category}

        />
             
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>  
    );
}

export default ProductForm;