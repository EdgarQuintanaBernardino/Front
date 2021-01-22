import "regenerator-runtime/runtime"

import alertas from '@/assets/repositoriosjs/alertas.js';
import Service from "@/services/SessionStorage";

const valida=(result)=>{
 let alert= alertas();
 
 return    result.code==200?success(result.data)
           :result.data.code==403?denegado(alert)
           :result.data.code==401?credentialinvalid(alert)
           :error500(alert);
               }
const validarol=(result)=>{
                let alert= alertas();
           return    result.code==200?result.code
                     :result.data.code==403?denegado(alert)
                     :result.data.code==401?credentialinvalid(alert)
                     :error500(alert); }

        function pendiente(alert){
           alert.pending();
          }
      function success(result){
         return result;
       }
      function denegado(alert){
           alert.denegado();
       }
      function sinroles(alert){
           alert.sinroles();
           return false;
       }
      function credentialinvalid(alert){
           alert.invalid();
       }
      function error500(alert){
           alert.errorservidor();
       }
       export default ()=> ({
         valida,
         validarol
    
       
    });