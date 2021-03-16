import "regenerator-runtime/runtime"
import store from "@/store";
import Axios from "axios";
import VueCryptojs from 'vue-cryptojs'
import Vue from 'vue'

import localstorage from '@/services/SessionStorage.js'
import repologin from '@/views/pages/repologin.js'
import respuestas from './respuestas'
import alertas from './alertas'


//const server="http://127.0.0.1:8000/api";
const server='http://35.164.247.176/api';

let api = `${server}/user/update`;
let apidesdeadmin= `${server}/user/updatedesdeadmin`;////check
let apiempresa = `${server}/empresa/create`;
let apiempresaupdate = `${server}/empresa/update`;
let apicuentaupdate = `${server}/cuenta/update`;
let updateforsharedapi = `${server}/cuenta/updateforshared`;



let setcuentasempresa = `${server}/cuenta/relacionempresa`;

let resetcontrasena = `${server}/user/refresh`;
let addcuenta = `${server}/cuenta/create`;
let getcuentas = `${server}/cuenta/getall`;


let apiempresadelete = `${server}/empresa/delete`;
let apicuentaadelete = `${server}/cuenta/delete`;
let apigetusers = `${server}/user/all`;
let updateusers = `${server}/user/updateuser`;
let updateusersadmin = `${server}/user/lockadmin`;
let unlockusersadminapi = `${server}/user/unlockadmin`;

let apiresetpassword = `${server}/user/resetpassword`;
let apiradduser = `${server}/user/create`;
let deleteuserin = `${server}/user/destroy`;
let getrolesypermisos = `${server}/role/all`;
let droprol = `${server}/role/destroy`;
let createrol = `${server}/role/create`;
let uprol = `${server}/role/update`;
let updaterolesuser =`${server}/user/addrole`;
let getproductosapi =`${server}/producto/getall`;
let compartepersmisoproductoapi=`${server}/producto/permissions`;
let createproduct =`${server}/producto/create`;
let deletefotogalery=`${server}/producto/deletephoto`;
let deletefotogaleryshared=`${server}/producto/deletephotoshared`;

let updateproduct=`${server}/producto/update`;
let updateproductosharedapi=`${server}/producto/updateshared`;

let destroyproductsharedapi=`${server}/producto/destroyshared`;

let deleteproducto=`${server}/producto/destroy`;
let empresasall=`${server}/empresa/all`;
let pagossend=`${server}/user/send`;
let solicitudsinsendapi=`${server}/user/allsmall`;
let pagossolicitudapi=`${server}/user/solicitarpago`;
let deletefotopagos=`${server}/pagos/deletephotopago`;
let actualizapago=`${server}/user/updatepago`;
let deletepago=`${server}/user/deletepago`;
let restoreuser=`${server}/user/restore`;
let userscambia=`${server}/user/onlyupdate`;
let allusers=`${server}/user/allusers`;///verify
let allonluusers=`${server}/user/allusersonlypost`;///solo tus amigos

let sendorrequest=`${server}/user/createorrequest`;///solo tus amigos
let lockuserapi=`${server}/user/lockuser`;///solo tus amigos

let unlockuserapi=`${server}/user/unlockuser`;///solo tus amigos
let cancelrequestapi=`${server}/user/cancelrequest`;///solo tus amigos
let cancelrequestinapi=`${server}/user/cancelrequestin`;///solo tus amigos

let aceptrequestapi=`${server}/user/aceptrequest`;///solo tus amigos

let lockuserrequestapi=`${server}/user/lockuserrequest`;///bloquea desde la solicitud, eliminando la misma y bloqueando al usuario
let onlyempresaapi=`${server}/empresa/onlyempresas`;
let onlyempresaapiback=`${server}/empresa/onlyempresasback`;

let compartepersmisoempresaapi=`${server}/empresa/permissions`;
let compartepersmisocuentaapi=`${server}/cuenta/permissions`;
let getsharedproductspai=`${server}/producto/sharedproducts`;

let getsharedcompaniesapi=`${server}/empresa/sharedcompanies`;

let editsharedcompaniesapi=`${server}/empresa/editsharedcompanies`;
let deletesharedcompaniesapi=`${server}/empresa/deletesharedcompanies`;


let createpermisoscuentaapi=`${server}/empresa/deletesharedcompanies`;

let sharedcuentasapi=`${server}/cuenta/sharedcuentas`;
let deletecuentasharedapi=`${server}/cuenta/deletecuentashared`;
let yourrequestapi=`${server}/user/yourrequest`;
let invitaramigoapi=`${server}/user/allusers`;
let yourusersbackapi=`${server}/user/interfaceuser`;
let yourusersbackadminapi=`${server}/user/interfaceuseradmin`;



const response=respuestas();
const alerts=alertas();



const yourrequest = async (request) => {

    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(yourrequestapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
      //
      return response.filtraerror(error);
    });
    return result;


}
const update = async (request) => {

    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(api, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
      //
      return response.filtraerror(error);
    });
    return result;


}

const createempresa = async (request) => {

    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apiempresa, request, configin).then((res) => {
        return response.verifyresponseempresa(res.data)

    }).catch((error) => {
        return response.filtraerror(error);
    });
    return result;

}
const updatecontrasenauser = async (request) => {
    try {

        let check = repologin();
        let result = await check.login(request);

        if (result.data.hasOwnProperty('token')) {
         return setcontraback(request,result.data.token);
        } else {
            return "contraseña invalida";
        }



    } catch (error) {
   //   console.log(error)
        return "contraseña invalida";
    }
}
async function setcontraback(request,tokenin) {
    let config = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let responses = await Axios.post(resetcontrasena, request, config).then((res) => {
        return alerts.successpass();
    }).catch((error) => {
        return response.verifyresponse(response.filtraerror(error));
          });
    return responses;
}
const adcuenta = async (request) => {
    let token = store.getters.gettoken;

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let response = await Axios.post(addcuenta, request, config).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });

    return response;

}
const cuentasitem = async (request) => {
    let token = store.getters.gettoken;

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let response = await Axios.post(getcuentas, request, config).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    ;
    return response;
}
const updateempresa = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apiempresaupdate, request, configin).then((res) => {
        return response.empresaedit(res.data)

    }).catch((error) => {
        return response.filtraerror(error);
    });

    return result;

}
const updatecuenta = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apicuentaupdate, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });

    return result;

}
const deleteempresa = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apiempresadelete, request, configin).then((res) => {
        return response.empresadelete(res.data)

    }).catch((error) => {
        return response.filtraerror(error);
 
    });
    return result;

}
const destroyproduct = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deleteproducto, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;

}
const destroyproductshared = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(destroyproductsharedapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;

}
const deletecuenta = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apicuentaadelete, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;

}
const deletecuentashared = async (request) => {
  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletecuentasharedapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta)
  });
  return result;

}
const consultasepomex = async (request) => {
    let endpoint_sepomex = "https://api-sepomex.hckdrk.mx/query/info_cp/";
    let url = endpoint_sepomex + request;
    let result = await Axios.get(url).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta).name
    });
    return result;
}

function resultestados(request) {
    let estados = [];
    for (let i = 0; i < request.length; i++) {
        if (estados.indexOf(request[i].response.estado)) {
            estados.push(request[i].response.estado);
        }
    }
    return estados;
}
function resultmunicipios(request) {
    let estados = [];
    for (let i = 0; i < request.length; i++) {
        if (estados.indexOf(request[i].response.municipio)) {
            estados.push(request[i].response.municipio);
        }
    }
    return estados;
}
function resultcolonias(request) {
    let estados = [];
    for (let i = 0; i < request.length; i++) {
        if (estados.indexOf(request[i].response.asentamiento)) {
            estados.push(request[i].response.asentamiento);
        }
    }
    return estados;
}
const relacioncuentaempresa = async (request, cuentain) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(setcuentasempresa, { array: request, cuenta: cuentain }, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta).name
    });
    return result;
}

const getroles_permisos = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(getrolesypermisos, request, configin).then((res) => {
        return response.verifyrequesttables(res)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}
const getusers = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apigetusers, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;
}
const updateuseradmin = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(updateusers, request, configin).then((res) => {
        return response.verifyresponse(res.data)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}
const lockuseradmin = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(updateusersadmin, request, configin).then((res) => {
        return response.verifyresponseadmin(res.data)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}
const unlockuseradmin = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(unlockusersadminapi, request, configin).then((res) => {
        return response.verifyresponseadmin(res.data)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}

const resetpassword = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apiresetpassword, request, configin).then((res) => {
        return response.verifyadduser(res.data);
    }).catch((error) => {
        return response.validaadduser(error)
    });
    return result;
}
const adduser = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(apiradduser, request, configin).then((res) => {
        return response.verifyadduser(res.data);
    }).catch((error) => {
        return response.validaadduser(error)
    });
    return result;
}
const deleteuser = async (request) => {
    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deleteuserin, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;
}
const deleterol = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(droprol, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta)
    });
    return result;
}
const createrole = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(createrol, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {

        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);

    });
    return result;
}
const updaterole = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(uprol, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const addupdaterolesuser = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(updaterolesuser, request, configin).then((res) => {
        return response.verifyresponserole(res.data)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}
const createproducto = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(createproduct, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}

const deletefotogaleria = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deletefotogalery, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}

const deletefotogaleriashared = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deletefotogaleryshared, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const updateproducto = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(updateproduct, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const allempresas = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(empresasall, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const getpagossend = async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(pagossend, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}

const solicitudsinsend =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(solicitudsinsendapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const solicitarpago =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(pagossolicitudapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const deletephotopagossend =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deletefotopagos, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const editpago =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(actualizapago, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const destroypago =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(deletepago, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const cambiabandera =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(restoreuser, request, configin).then((res) => {
        return response.nocontent(res.data)

    }).catch((error) => {
        return response.filtraerror(error);

    });
    return result;
}
const getonlyupdate =async (request) => {


    let tokenin = store.getters.gettoken;

    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(userscambia, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
}
const getallusers =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(allusers, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const onlyusers =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(allonluusers, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
    return response.filtraerror(error);
  });
  return result;
}
const sendorsolicita =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(sendorrequest, request, configin).then((res) => {
    return response.verifyrequest(res.data)
  }).catch((error) => {
    return response.filtraerror(error);
  });
  return result;
}
const yourusersback =async (request) => {


    let tokenin = store.getters.gettoken;
  
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(yourusersbackapi, request, configin).then((res) => {
      return response.verifyrequesttables(res)
    // return res;
    }).catch((error) => {
      return response.filtraerror(error);
    });
    return result;
  }
  const yourusersbackadmin =async (request) => {


    let tokenin = store.getters.gettoken;
  
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(yourusersbackadminapi, request, configin).then((res) => {
      return response.verifyrequesttables(res)
    // return res;
    }).catch((error) => {
      return response.filtraerror(error);
    });
    return result;
  }

const lockuser =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(lockuserapi, request, configin).then((res) => {
      return response.validafriendslock(res)
      }).catch((error) => {
    return response.filtraerror(error);
       });
  return result;
}


const unlockuser =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(unlockuserapi, request, configin).then((res) => {
    return response.validafriends(res)
}).catch((error) => {
  return response.filtraerror(error);
  });
  return result;
}

const cancelrequest =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(cancelrequestapi, request, configin).then((res) => {
    return response.validafriends(res)
}).catch((error) => {
  return response.filtraerror(error);
});
return result;
}
const cancelrequestin =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(cancelrequestinapi, request, configin).then((res) => {
    return response.validafriends(res)
  }).catch((error) => {
    return response.filtraerror(error);
   
  });
  return result;
}
const aceptrequest =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(aceptrequestapi, request, configin).then((res) => {
    return response.validafriends(res)
}).catch((error) => {
      return response.filtraerror(error);
    });
  return result;
}
const lockuserrequest =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(lockuserrequestapi, request, configin).then((res) => {
    return response.validafriends(res.data)
}).catch((error) => {
      return response.filtraerror(error);
    });
  return result;
}
const invitaramigo =async (request) => {


    let tokenin = store.getters.gettoken;
  
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(invitaramigoapi, request, configin).then((res) => {
      return response.validafriends(res.data)
  }).catch((error) => {
        return response.filtraerror(error);
      });
    return result;
  }

const getempresas =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(onlyempresaapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const getempresasback =async (request) => {


    let tokenin = store.getters.gettoken;
  
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(onlyempresaapiback, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
  }
const compartepersmisoempresa =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisoempresaapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const createpermisoscuenta =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(createpermisoscuentaapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const compartepersmisocuenta =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisocuentaapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const getsharedcompanies =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getsharedcompaniesapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const editsharedcompanies =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(editsharedcompaniesapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const deletesharedcompanies =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(deletesharedcompaniesapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const sharedcuentas =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(sharedcuentasapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const updateforshared =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(updateforsharedapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const getproductos =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getproductosapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const compartepersmisoproducto =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(compartepersmisoproductoapi, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const getsharedproducts =async (request) => {


  let tokenin = store.getters.gettoken;

  let configin = {
      headers: { Authorization: `Bearer ${tokenin}` }
  };
  let result = await Axios.post(getsharedproductspai, request, configin).then((res) => {
      return res.data;
  }).catch((error) => {
      let respuesta = JSON.stringify(error)
      return JSON.parse(respuesta);
  });
  return result;
}
const updateproductoshared =async (request) => {


    let tokenin = store.getters.gettoken;
  
    let configin = {
        headers: { Authorization: `Bearer ${tokenin}` }
    };
    let result = await Axios.post(updateproductosharedapi, request, configin).then((res) => {
        return res.data;
    }).catch((error) => {
        let respuesta = JSON.stringify(error)
        return JSON.parse(respuesta);
    });
    return result;
  }

export default () => ({
    getempresasback,
    yourusersbackadmin,
    unlockuseradmin,
    lockuseradmin,
    yourusersback,
    invitaramigo,
    yourrequest,
    deletefotogaleriashared,
    destroyproductshared,
    updateproductoshared,
  getsharedproducts,
  compartepersmisoproducto,
  getproductos,
  deletecuentashared,
  updateforshared,
  sharedcuentas,
  createpermisoscuenta,
  compartepersmisocuenta,
  deletesharedcompanies,
  editsharedcompanies,
  getsharedcompanies,
    update,
    createempresa,
    deleteempresa,
    consultasepomex,
    resultestados,
    resultmunicipios,
    resultcolonias,
    updateempresa,
    updatecontrasenauser,
    adcuenta,
    cuentasitem,
    deletecuenta,
    updatecuenta,
    relacioncuentaempresa,
    getusers,
    updateuseradmin,
    resetpassword,
    adduser,
    deleteuser,
    getroles_permisos,
    deleterol,
    createrole,
    updaterole,
    addupdaterolesuser,
    createproducto,
    deletefotogaleria,
    updateproducto,
    destroyproduct,
    allempresas,
    getpagossend,
    solicitudsinsend,
    solicitarpago,
    deletephotopagossend,editpago,destroypago,cambiabandera,
    getonlyupdate,getallusers,onlyusers,sendorsolicita,lockuser,unlockuser,cancelrequest,aceptrequest,cancelrequestin,lockuserrequest,
    getempresas,compartepersmisoempresa,

});
