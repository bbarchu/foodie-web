import React, {useState} from 'react';
import ShopForm from './ShopForm';
import { toast } from 'react-toastify';
import url from './common/apilink.json';
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
        
        if(!formIsValid()) return;

        fetch( url.BASE_URL + '/api/admin/shops', {
            method: 'POST',
            body: JSON.stringify({
                address: shop.address,
                location: shop.location,
                category: shop.category,
                name: shop.name,
                description: shop.description

            })
        }).then((res) => {
            if (res.ok){
                props.history.push("/shops");
                toast.success("Shop was added!")
                
            }
            else{
                toast.error("Can't add Shop")
                return res.json()
            }
        }).then((resjson) => {
            
            const _errors = {};
            if(resjson.name) _errors.name= resjson.name[0];
            if(resjson.category) _errors.category= resjson.category[0];
            if(resjson.location) _errors.location= resjson.location[0];
            if(resjson.address) _errors.address= resjson.address[0];
            if(resjson.description) _errors.description= resjson.description[0];
            setErrors(_errors);
        }).catch((e) => console.log(e));

    }

    function formIsValid(){
        const _errors = {};
        if(!shop.name) _errors.name= "Name is required";
        if(!shop.category) _errors.category= "Category is required";
        if(!shop.location) _errors.location= "Location is required";
        if(!shop.address) _errors.address= "Address is required";
        if(!shop.description) _errors.description= "Description is required";



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