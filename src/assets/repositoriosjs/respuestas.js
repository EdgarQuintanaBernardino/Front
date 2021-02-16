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
const verifyrequesttables=(result)=>{
    
    return    result.status==200?success(result.data)
    :result.data.code==403?denegado2()
    :result.data.code==401?credentialinvalid2()
    :error500();
                  }
const verifyrequest=(result)=>{
    
    return    result.code==200?successrequest(result.data)
              :result.code==195?solicitudyaenviada()
              :result.code==196?solicitudyarecibida()
              :result.code==197?userbloqueadoporti()
              :result.code==403?listanegra2()
              :result.code==408?yourusers()

              :error500();
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
               const validafriends=(result)=>{
                   
 
                return    result.code==200?success(result)
                          :result.data.code==403?denegado()
                          :result.data.code==401?credentialinvalid()
                          :error500();
                              }
                              const validafriendslock=(result)=>{
                   
 
                                return    result.data.code==200?success(result)
                                          :result.data.code==403?denegado()
                                          :result.data.code==401?credentialinvalid()
                                          :error500();
                                              }
const validarol=(result)=>{
           return    result.code==200?result.code
                     :result.code==401?sinroles()
                     :result.data.code==403?denegado2()
                     :result.data.code==401?credentialinvalid()
                     :error500(); }

        function pendiente(){
           alerts.pending();
          }
      function success(result){
        return result;
       }
        function solicitudyaenviada(){
            alerts.solicitudenviada();
            return false;
       }
       function yourusers(){
        alerts.listaamigos();
        return false;
   }
       function solicitudyarecibida(){

        alerts.solicitudrecibida();
        return false;
       }
       function userbloqueadoporti(){
                    alerts.yourlock();
                    return false;
        
       }
       function listanegra2(){
        alerts.listanegra();
        return false;

}
function successrequest(result){
    alerts.solicitudenviadaok();
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
           router.push({ path: '/login' })

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
        verifyrequesttables,
        verifyrequest,
         valida,
         validarol,
         filtraerror,
         verifyresponse,
         sucessfotoperfil
         ,validafriends,validafriendslock
    
       
    });