import React, {useState} from 'react';
import ShopForm from './ShopForm';
import { toast } from 'react-toastify';

const ManageShopPage = props => {
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
        //shopAPI.saveCourse(shop).then(() => { 
        //    props.history.push("/shops");
        //    toast.success("Shop was added!");
        //});
        //npm install react-toastify@5.1.1
    }
    return (
        <React.Fragment>
            <h2> Manage Shop</h2>
            <ShopForm shop={shop} onChange={handleChange}/>
        </React.Fragment>
    )
}

export default ManageShopPage;