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
        //error={props.error.name}

        />
             
          
        <TextInput
        id="description"
        label="Description"
        name="description"
        value={props.shop.description}
        onChange={props.onChange}
        />
           
        <TextInput
        id="address"
        label="Address"
        name="address"
        value={props.shop.address}
        onChange={props.onChange}
        />
             
        <TextInput
        id="location"
        label="Location"
        name="location"
        value={props.shop.location}
        onChange={props.onChange}
        />
             
        <TextInput
        id="category"
        label="Category"
        name="category"
        value={props.shop.category}
        onChange={props.onChange}
        />
             
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>  
    );
}

export default ShopForm;