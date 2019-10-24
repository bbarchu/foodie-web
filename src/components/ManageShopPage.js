import React, {useState} from 'react';
import ShopForm from './ShopForm';
import { toast } from 'react-toastify';

const ManageShopPage = props => {
    const [errors, setErrors] = useState({});
    const [shop, setShop] = useState({
        id:null,
        slug:"",
        name:"",
        description:"",
        address:"",
        location:"",
        category:"",
        creation_date:"",
    });

    function handleChange({target}){
        const updatedShop = { ...shop, [target.name]: target.value};
        setShop(updatedShop);
    }

    function handleSubmit(event){

        
        if(!formIsValid()) return;

        fetch('https://taller2-herokuapp.com/api/admin/shops', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: shop.address,
                location: shop.location,
                category: shop.category,
                name: shop.name,
                description: shop.description

            })
        }).then(() => { 
            props.history.push("/shops");
            toast.success("Shop was added!");
        });

        event.preventDefault();
    }

    function formIsValid(){
        const _errors = {};
        if(!shop.name) _errors.name= "Name is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <React.Fragment>
            <h2> Add Shop</h2>
            <ShopForm 
            shop={shop}
            onChange={handleChange}
            errors={errors}
            onSubmit={handleSubmit}/>
        </React.Fragment>
    )
}

export default ManageShopPage;