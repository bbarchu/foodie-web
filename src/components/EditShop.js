import React from 'react';

function EditShop(props){
    const  { shop }  = this.props.location.props
    const [shop, setShop] = useState({
        id:null,
        name:shop.name,
        description:shop.description,
        address:shop.address,
        location:shop.location,
        category:shop.category,
        creation_date:shop.creation_date
    });

    function handleChange({target}){
        const updatedShop = { ...shop, [target.name]: target.value};
        setShop(updatedShop);
    }


}