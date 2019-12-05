import { toast } from 'react-toastify';

function manejadorErrores(status){
    if( status >= 300 && status < 400){
        toast.info("Hubo una redirección");
    }
    else if (( status >= 400 && status < 500)){
        toast.info("Asegurate de haber ingresado la informacion correctamente");
    }
    else if ( status >= 500 ) {
        toast.info("Ups! El servidor esta teniendo un problema");

    }

}

export default manejadorErrores;