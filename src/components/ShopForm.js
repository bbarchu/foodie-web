import React from 'react';
import TextInput from './common/TextInput';

function ShopForm(props) {
    return ( 
      <form onSubmit={props.onSubmit}>
                
        <TextInput
        id="name"
        label="Name"
        name="name"
        value={props.shop.name}
        onChange={props.onChange}
        error={props.errors.name}

        />
             
          
        <TextInput
        id="description"
        label="Description"
        name="description"
        value={props.shop.description}
        onChange={props.onChange}
        error={props.errors.description}

        />
           
        <TextInput
        id="address"
        label="Address"
        name="address"
        value={props.shop.address}
        onChange={props.onChange}
        error={props.errors.address}

        />
             
        <TextInput
        id="location"
        label="Location"
        name="location"
        value={props.shop.location}
        onChange={props.onChange}
        error={props.errors.location}

        />
             
        <TextInput
        id="category"
        label="Category"
        name="category"
        value={props.shop.category}
        onChange={props.onChange}
        error={props.errors.category}

        />
             
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>  
    );
}

export default ShopForm;