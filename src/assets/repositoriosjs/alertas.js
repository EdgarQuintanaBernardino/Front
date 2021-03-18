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
      const useradd= async ()=>{
        let mensaje={
            tittle:'Agregado',
            text:'Usuario agregado con éxito',
            icon:'success'
        };
        response(mensaje);
  }
  const passwordsucccess= async ()=>{
    let mensaje={
        tittle:'Password',
        text:'Password reseteado con éxito',
        icon:'success'
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
    const bloqueado=async()=>{
      let mensaje={
        tittle:'"Bloqueado',
        text:'"El usuario se ha Bloqueado Con Éxito.',
        icon:'success'
    };
     response(mensaje);
    

    }
const solicitudaceptada=async()=>{
  let mensaje={
    tittle:'"Aceptada!',
    text:'Solicitud Aceptada con éxito',
    icon:'success'
};
 response(mensaje);

}
const requestcancelada=async()=>{
  let mensaje={
    tittle:'"Cancelada!',
    text:'Solicitud Cancelada con éxito',
    icon:'success'
};
 response(mensaje);

}
const empresaagregada=async()=>{
  let mensaje={
    tittle:'"Agregada!',
    text:'Empresa Agregada con éxito',
    icon:'success'
};
 response(mensaje);

}
const cuentaagregada=async()=>{
  let mensaje={
    tittle:'"Agregada!',
    text:'Cuenta Agregada con éxito',
    icon:'success'
};
 response(mensaje);

}
const cuentaactualizada=async()=>{
  let mensaje={
    tittle:'"Actualizada!',
    text:'Cuenta Actualizada con éxito',
    icon:'success'
};
 response(mensaje);

}

const solicitudrechazada=async()=>{
  let mensaje={
    tittle:'"Rechazada!',
    text:'Solicitud rechazada con éxito',
    icon:'success'
};

 response(mensaje);

}
const solicitudenviadaok=async()=>{
  let mensaje={
    tittle:'"Enviada!',
    text:'Solicitud enviada con éxito',
    icon:'success'
};

 response(mensaje);

}

const yourlock=async()=>{
  let mensaje={
    tittle:'"Error!',
    text:'No puedes enviar solicitud a este usuario,esta en tu lista de usuarios bloqueados',
    icon:'error'
};
response(mensaje);

}
const listanegra=async()=>{
  let mensaje={
    tittle:'"Error!',
    text:'No puedes enviar solicitud a este usuario,Acceso Denegado',
    icon:'error'
};
response(mensaje);

}
const solicitudenviada=async()=>{
  let mensaje={
    tittle:'"Error!',
    text:'Ya enviaste una solicitud a este usuario',
    icon:'error'
};
response(mensaje);

}


const empresaactualizada=async()=>{
  let mensaje={
    tittle:'OK',
    text:'Empresa Actualizada con éxito',
    icon:'success'
};
response(mensaje);

}
const solicitudrecibida=async()=>{
  let mensaje={
    tittle:'"Error!',
    text:'Ya tienes una solicitud de este usuario',
    icon:'error'
};
response(mensaje);

}

const errorgenerico=async()=>{
  let mensaje={
    tittle:'"Error!',
    text:'Ocurrio un Error vuelve a intentar',
    icon:'error'
};
response(mensaje);

}
const yourmail=async()=>{
  let mensaje={
    tittle:'Error!',
    text:'El correo electrónico ingresado es el TUYO',
    icon:'error'
};
response(mensaje);

}

const roleactualizado=async()=>{
  let mensaje={
    tittle:'Roles & Permisos',
    text:'Roles & Permisos Actualizados Con éxito',
    icon:'success'
};
response(mensaje);

}

const userdesbloqueado=async()=>{
  let mensaje={
    tittle:'Desbloqueado!',
    text:'Usuario desbloqueado con éxito',
    icon:'success'
};
response(mensaje);

}
const listaamigos=async()=>{
  let mensaje={
    tittle:'Error!',
    text:'El correo electrónico ingresado ya se encuentra en tu lista de amigos',
    icon:'question'
};
response(mensaje);

}

const deletemsj=async(item)=>{
  let mensaje={
    tittle:'Perfecto!',
    text:item+' con éxito',
    icon:'success'
};
response(mensaje);

}
const empresadelete=async()=>{
  let mensaje={
    tittle:'Perfecto!',
    text:'Empresa Eliminada con éxito',
    icon:'success'
};
response(mensaje);

}
 const bloquearusuario=async(item)=>{
 


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
  deletemsj,
  cuentaactualizada,
  cuentaagregada,
  empresadelete,
  empresaactualizada,
  empresaagregada,
  roleactualizado,
  passwordsucccess,
  useradd,
  yourlock,
  solicitudenviadaok,
  solicitudrecibida,
  solicitudenviada,
  listanegra,
  userdesbloqueado,
  listaamigos,
  yourmail,
  requestcancelada,
  bloquearusuario,
  errorgenerico,
    denegado,
    invalid,
    sinroles,
    errorservidor,
    pending,perfilactualizado,imagenupload,errortoken,imagenotvalid,errorcp,successpass,intentos,solicitudaceptada,solicitudrechazada,bloqueado
    
   
});