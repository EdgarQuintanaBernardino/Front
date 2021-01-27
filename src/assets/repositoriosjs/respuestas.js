import "regenerator-runtime/runtime"

import alertas from '@/assets/repositoriosjs/alertas.js';
import Service from "@/services/SessionStorage";
import router from '@/router/index'

const alerts =alertas();

const filtraerror=(error)=>{
    let respuesta = JSON.parse(JSON.stringify(error))
    let datos={code:401};
    respuesta.data=datos;
     if(respuesta.message=='Request failed with status code 401'){return respuesta;}
    if(respuesta.message=='Request failed with status code 500'){ respuesta.data.code=500; return respuesta;}

}
const verifyresponse=(result)=>{
    
    return    result.code==200?successprofile(result.data)
              :result.data.code==403?denegado2()
              :result.data.code==401?credentialinvalid2()
              :error500();
                  }
const valida=(result)=>{
 
 return    result.code==200?success(result.data)
           :result.data.code==403?denegado()
           :result.data.code==401?credentialinvalid()
           :error500();
               }
const validarol=(result)=>{
           return    result.code==200?result.code
                     :result.code==401?sinroles()
                     :result.data.code==403?denegado()
                     :result.data.code==401?credentialinvalid()
                     :error500(); }

        function pendiente(){
           alerts.pending();
          }
      function success(result){
        return result;
       }

       function successprofile(result){
        alerts.perfilactualizado();
        return result;
       }
      function denegado2(){
        router.push({ path: '/login' })
           alerts.denegado();
       }
       function denegado(){
        alerts.denegado();
    }
      function sinroles(){
           alerts.sinroles();
           router.push({ path: '/login' })
        }
      function credentialinvalid(){
           alerts.invalid();
       }
       function credentialinvalid2(){
        alerts.invalid();
        router.push({ path: '/login' })

    }
  
    function sucessfotoperfil (){
        alerts.imagenupload();
    }
      function error500(){
           alerts.errorservidor();
       }
       export default ()=> ({
         valida,
         validarol,
         filtraerror,
         verifyresponse,
         sucessfotoperfil
    
       
    });