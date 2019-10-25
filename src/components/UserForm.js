import React from 'react';
import TextInput from './common/TextInput';

function UserForm(props) {
    return ( 
      <form onSubmit={props.onSubmit}>
                
        <TextInput
        id="name"
        label="Name"
        name="name"
        value={props.user.name}
        onChange={props.onChange}
        error={props.errors.name}

        />
             
          
        <TextInput
        id="description"
        label="Description"
        name="description"
        value={props.user.description}
        onChange={props.onChange}
        error={props.errors.description}

        />
           
        <TextInput
        id="address"
        label="Address"
        name="address"
        value={props.user.address}
        onChange={props.onChange}
        error={props.errors.address}

        />
             
        <TextInput
        id="location"
        label="Location"
        name="location"
        value={props.user.location}
        onChange={props.onChange}
        error={props.errors.location}

        />
             
        <TextInput
        id="category"
        label="Category"
        name="category"
        value={props.user.category}
        onChange={props.onChange}
        error={props.errors.category}

        />
             
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>  
    );
}

export default UserForm;