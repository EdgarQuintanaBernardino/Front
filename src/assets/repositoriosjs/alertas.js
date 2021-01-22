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
     const errorservidor= async ()=>{
        let mensaje={
            tittle:'Servidor',
            text:'Error de Servidor,Intente mas tarde',
            icon:'error'
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
      const sinroles=async()=>{
        let mensaje={
            tittle:'Consulta a Soporte Técnico',
            text:'Aún no tienes acceso. Sin rol de acceso',
            icon:'question'
        };
        response(mensaje);

      }
      const pending=async()=>{
        let mensaje={
            tittle:'Consulta a Soporte Técnico',
            text:'Aún no tienes acceso. Pendiente',
            icon:'question'
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
    invalid,
    sinroles,
    errorservidor,
    pending
    
   
});