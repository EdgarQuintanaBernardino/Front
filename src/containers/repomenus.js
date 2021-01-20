import "regenerator-runtime/runtime"
import store from "@/store";
import Axios from "axios";
import Vue from 'vue'

const server =Vue.prototype.$apiAdress;

let rendermenuapi=`${server}/api/menu`;
let rolesuser=`${server}/api/users/getroles`;
let rolesuserapi=`${server}/api/users/changerole`;


const rendermenu = async (request) => {
    let tokenin = store.getters.gettoken;
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(rendermenuapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
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
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;


}
export default () => ({
    rendermenu,
    getroles,
    changeR
});
