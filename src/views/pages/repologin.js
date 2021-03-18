import "regenerator-runtime/runtime"

import Axios from "axios";

const server="http://127.0.0.1:8000";
//const server='http://18.218.153.207';

const api = `${server}/api/login`;
const apiregister=`${server}/auth/register`;
const login = async (credentials) => {
    let result = await Axios.post(api,credentials).then((res) => {
        console.log(res)
        return res;
    }).catch((error) => {
        let respuesta = JSON.parse(JSON.stringify(error))
        let datos={code:401};
        respuesta.data=datos;
         if(respuesta.message=='Request failed with status code 401'){return respuesta;}
        if(respuesta.message=='Request failed with status code 500'){ respuesta.data.code=500; return respuesta;}
              
    });
    return result;


}

const register= async (request)=>{
    let result = await Axios.post(apiregister, request);
    
    return result.data;

}

export default ()=> ({
    login,
    register,
 
   
});