import React, {useState} from 'react';
import ProductForm from './ProductForm';
import { toast } from 'react-toastify';
import url from './common/apilink.json';
const ManageProductPage = props => {
    const [errors, setErrors] = useState({});
    const [product, setShop] = useState({
        id:null,
        slug:"",
        name:"",
        description:"",
        category:"",
        price:"",
        shop_id: props.location.props.id
    });

    function handleChange({target}){
        const updatedShop = { ...product, [target.name]: target.value};
        setShop(updatedShop);
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!formIsValid()) return;
        fetch(url.BASE_URL + '/api/admin/products', {
            method: 'POST',
            body: JSON.stringify({
                shop_id:product.shop_id,
                price:product.price,
                category: product.category,
                name: product.name,
                description: product.description

            })
        }).then(() => { 
            props.history.push("/shops");
            toast.success("product was added!");
        }).catch((e) => console.log(e));

    }

    function formIsValid(){
        const _errors = {};
        if(!product.name) _errors.name= "Name is required";
        if(!product.category) _errors.category= "Category is required";
        if(!product.price) _errors.price= "Price is required";
        if(!product.description) _errors.description= "Description is required";

        setErrors(_errors);
        return Object.keys(_errors).length === 0;
    }

    return (
        <React.Fragment>
            <h2> Add product</h2>
            <ProductForm 
            product={product}
            onChange={handleChange}
            errors={errors}
            onSubmit={handleSubmit}/>
        </React.Fragment>
    )
}

export default ManageProductPage;