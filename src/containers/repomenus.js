import "regenerator-runtime/runtime"
import store from "@/store";
import Axios from "axios";
import Vue from 'vue'

const server =Vue.prototype.$apiAdress;
let setMetodoapi=`${server}/api/user/setMetodo`;

let rendermenuapi=`${server}/api/menu`;
let rolesuser=`${server}/api/users/getroles`;
let rolesuserapi=`${server}/api/users/changerole`;
let getlenguajesapi=`${server}/api/langlist`;

let languserapi=`${server}/api/users/setlang`;

const rendermenu = async (request) => {
    let tokenin = store.getters.gettoken;
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(rendermenuapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        return validaerror(error);

    });
    return result;
}
const setMetodo = async (request) => {

    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(setMetodoapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
      //
      return validaerror(error);
    });
    return result;


}
const changeR = async (request) => {
    let tokenin = store.getters.gettoken;
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(rolesuserapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        return validaerror(error);
         });
    return result;
}
const changeL = async (request) => {
    let tokenin = store.getters.gettoken;
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(languserapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        return validaerror(error);
         });
    return result;
}
const getlenguajes = async () => {

    let result = await Axios.get(getlenguajesapi).then((res) => {
        return res;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;
}

const getroles = async (request) => {

    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(rolesuser, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
       return validaerror(error);
    });
    return result;


}
function validaerror(error){
    let respuesta = JSON.parse(JSON.stringify(error))
    let datos={code:401};
    respuesta.data=datos;
     if(respuesta.message=='Request failed with status code 401'){return respuesta;}
    if(respuesta.message=='Request failed with status code 500'){ respuesta.data.code=500; return respuesta;}

}
export default () => ({
    rendermenu,
    getroles,
    changeR,
    getlenguajes,
    changeL,setMetodo
});
