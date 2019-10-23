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
        event.preventDefault();
        //if(!formIsValid()) return;
        //shopAPI.saveCourse(shop).then(() => { 
        //    props.history.push("/shops");
        //    toast.success("Shop was added!");
        //});
    }

    function formIsValid(){
        const _errors = {};
        if(!shop.name) _errors.name= "Name is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <React.Fragment>
            <h2> Manage Shop</h2>
            <ShopForm 
            shop={shop}
            onChange={handleChange}
            errors={errors}/>
        </React.Fragment>
    )
}

export default ManageShopPage;