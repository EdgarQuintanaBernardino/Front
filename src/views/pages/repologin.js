import "regenerator-runtime/runtime"

import Axios from "axios";

const server="http://127.0.0.1:8000";
//const server='https://api.lybflow.com';

const api = `${server}/api/login`;
const apiregister=`${server}/auth/register`;

const login= async (credentials)=>{
    let result = await Axios.post(api, credentials);
    
    return result.data;

   // return result;

}
const loginu= async (credentials)=>{
    let result = await Axios.post(api, credentials);
    
    return result.data;

   // return result;

}
const register= async (request)=>{
    let result = await Axios.post(apiregister, request);
    
    return result.data;

}

export default ()=> ({
    login,
    register
   
});