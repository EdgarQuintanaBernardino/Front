import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import Swal from "sweetalert2";
import "regenerator-runtime/runtime"

const denegado= async ()=>{
            let mensaje={
                tittle:'Denegado',
                text:'Acceso Denegado, Porfavor consulte a soporte técnico.',
                icon:'question'
            };
            response(mensaje);
      }

      const invalid=async()=>{
        let mensaje={
            tittle:'Error',
            text:'Usuario y/o Contraseña Incorrectas',
            icon:'error'
        };
        response(mensaje);

      }
      const response=async(response)=>{
           return Swal.fire({
            title: response.tittle,
            text: response.text,
            icon:response.icon,
            focusConfirm: false,
            showCloseButton: true,
            confirmButtonText:
            '¡Entendido!'
          });

      }

export default ()=> ({
    denegado,
    invalid
    
   
});