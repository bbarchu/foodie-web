import React, { useState } from 'react';
import TextInput from './common/TextInput';
import { toast } from 'react-toastify';


class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:this.props.location.props.user.id,
                name:this.props.location.props.user.name,
                surname:this.props.location.props.user.surname,
                email:this.props.location.props.user.email,
                phone:this.props.location.props.user.phone,
                password:this.props.location.props.user.password,
                role:this.props.location.props.user.role,
                subscription:this.props.location.props.user.subscription,
                photo_url:this.props.location.props.user.photo_url
            },
            errors:{}
            
        }
        //this.handleChange = this.handleChange.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        //this.handleChangePhoto = this.handleChangePhoto.bind(this)
        this.handleChangeRole = this.handleChangeRole.bind(this)
        this.handleChangeSubscription = this.handleChangeSubscription.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeSurname = this.handleChangeSurname.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    
      formIsValid(){
        const _errors = {};
        if(!this.state.user.name) _errors.name= "Name is required";
    
        this.state.errors = _errors
        return Object.keys(this.state.errors).length === 0;
    }  
    
    handleSubmit(event){
        event.preventDefault();        
        //this.setState({user: target.value});
        let user = this.state.user;
        let id = user.id
        console.log('A VER QUE MIERDA TIENE ESTO')
        console.log(user)
        fetch(`https://taller2-back.herokuapp.com/api/admin/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                phone: user.phone,
                role: user.role,
                subscription: user.subscription
            })
        }).then(() => { 
            toast.success("Successfull edit");
        }).catch((e) => console.log(e));
    }


    handleChange({target}) {
        this.setState({user: target.value});
        let user = this.state.user;
        fetch('https://taller2-back.herokuapp.com/api/admin/users/${user.id}', {
            method: 'PUT',
            body: JSON.stringify({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                phone: user.phone,
                role: user.role,
                subscription: user.subscription
            })
        }).then(() => { 
            toast.success("Successfull edit");
        }).catch((e) => console.log(e));
    }

    handleChangeName({target}) {
        const user = this.state.user
        const update = { name: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangeSurname({target}) {
        const user = this.state.user
        const update = { surname: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangePassword({target}) {
        const user = this.state.user
        const update = { password: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangePhone({target}) {
        const user = this.state.user
        const update = { phone: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangeRole({target}) {
        const user = this.state.user
        const update = { role: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangeSubscription({target}) {
        const user = this.state.user
        const update = { subscription: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }

    handleChangeEmail({target}) {
        const user = this.state.user
        const update = { email: target.value }
        const newUser = { ...user, ...update }
        this.setState({...this.state, ...{ user: newUser}})
    }
    

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <TextInput
                id="name"
                label="Name"
                name="name"
                value={this.state.user.name}
                onChange={this.handleChangeName}

                />
                    
                
                <TextInput
                id="surname"
                label="Surname"
                name="surname"
                value={this.state.user.surname}
                onChange={this.handleChangeSurname}

                />
                
                <TextInput
                id="email"
                label="Email"
                name="email"
                value={this.state.user.email}
                onChange={this.handleChangeEmail}

                />
                    
                <TextInput
                id="phone"
                label="phone"
                name="phone"
                value={this.state.user.phone}
                onChange={this.handleChangePhone}

                />
                    
                <TextInput
                id="password"
                label="Password"
                name="password"
                value={this.state.user.password}
                onChange={this.handleChangePassword}

                />

                <TextInput
                id="role"
                label="Role"
                name="role"
                value={this.state.user.role}
                onChange={this.handleChangeRole}

                />

                <TextInput
                id="subscription"
                label="Subscription"
                name="subscription"
                value={this.state.user.subscription}
                onChange={this.handleChangeSubscription}

                />

                <TextInput
                id="photo_url"
                label="photo_url"
                name="photo_url"
                value={this.state.user.photo_url}
                onChange={this.handleChangePhoto}

                />

                <input type="submit" value="Save" className="btn btn-primary" />

            </form>
        );
    }
    
}

export default EditUser;