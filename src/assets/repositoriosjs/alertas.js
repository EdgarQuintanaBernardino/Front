import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import Swal from "sweetalert2";
import "regenerator-runtime/runtime"
import router from '@/router/index'

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
     const perfilactualizado=async()=>{
      let mensaje={
          tittle:'Perfil',
          text:'Pefil actualizado con éxito',
          icon:'success'
      };
      response(mensaje);

    }
    const imagenupload=async()=>{
      let mensaje={
        tittle:'Imagen',
        text:'Imagen actualizada con éxito',
        icon:'success'
    };
    response(mensaje);

    }
    const successpass=async()=>{
      let mensaje={
        tittle:'Contraseña',
        text:'Actualizada con éxito, inicia sesión nuevamente',
        icon:'success'
    };
     response(mensaje);
        out();
    }
    const errortoken=async()=>{
      let mensaje={
        tittle:'Token',
        text:'Token Invalido, inicia sesión nuevamente',
        icon:'error'
    };
     response(mensaje);
        out();
    }
    const imagenotvalid=async()=>{
      let mensaje={
        tittle:'Imagen',
        text:'Seleccionaste una imagen mayor a 1mb o un archivo que NO es imagen, Intente nuevamente',
        icon:'error'
    };
     response(mensaje);
    
    }
    const errorcp=async()=>{
      let mensaje={
        tittle:'"Código Postal',
        text:'"Código Postal no encontrado, Intente nuevamente',
        icon:'error'
    };
     response(mensaje);
    
    }
    const out=async()=>{
      router.push({ path: '/login' })

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

      const intentos=async(intentos)=>{
          let flag=false;
        let mensaje={
          tittle:'Error intentos '+intentos,
          text:'Contraseña invalida, Intente nuevamente',
          icon:'error'
      };
      if(intentos>=3){
        mensaje.tittle="Demasiados intentos";
        mensaje.text="Redirigiendo a login"
        flag=true;
      }
       response(mensaje);
            flag?out():''
      
      }
export default ()=> ({
    denegado,
    invalid,
    sinroles,
    errorservidor,
    pending,perfilactualizado,imagenupload,errortoken,imagenotvalid,errorcp,successpass,intentos
    
   
});