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
        id="surname"
        label="Surname"
        name="surname"
        value={props.user.surname}
        onChange={props.onChange}
        error={props.errors.surname}

        />
           
        <TextInput
        id="email"
        label="Email"
        name="email"
        value={props.user.email}
        onChange={props.onChange}
        error={props.errors.email}

        />
             
        <TextInput
        id="phone"
        label="phone"
        name="phone"
        value={props.user.phone}
        onChange={props.onChange}
        error={props.errors.phone}

        />
             
        <TextInput
        id="password"
        label="Password"
        name="password"
        value={props.user.password}
        onChange={props.onChange}
        error={props.errors.password}

        />

        <TextInput
        id="role"
        label="Role"
        name="role"
        value={props.user.role}
        onChange={props.onChange}
        error={props.errors.role}

        />

        <TextInput
        id="subscription"
        label="Subscription"
        name="subscription"
        value={props.user.subscription}
        onChange={props.onChange}
        error={props.errors.subscription}

        />

        <TextInput
        id="photo_url"
        label="photo_url"
        name="photo_url"
        value={props.user.photo_url}
        onChange={props.onChange}
        error={props.errors.photo_url}

        />
             
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>  
    );
}

export default UserForm;