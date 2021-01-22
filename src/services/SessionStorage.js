
/**
 * Clave en el localstorage de la lalve JWT
 */
const key = "token";

/**
 * Clave de datos de usuario
 */
const keyUser = "user";

const KeyRoleactive='auth.roleactive'
const permisos='auth.permisos'

/**
 * Borra el cache del usuario
 */

 const rolesUser ="roles";
 const empresarUser='auth.empresas';
 const myusers='auth.onlyusers';
 const myusersdelete='auth.onlyusersdelete';
 const allpermisos='auth.allpermisos';
 const allroles='auth.allroles';
 const locale='locale';


const logout = async ()=> {
    await localStorage.clear();


}
const getallpermisos = () =>{
    let userCached = localStorage.getItem(allpermisos);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
const getallroles = () =>{
    let userCached = localStorage.getItem(allroles);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
const setallpermisos=(permisos)=>{
    localStorage.setItem(allpermisos, JSON.stringify(permisos));
}
const setallroles=(roles)=>{
    localStorage.setItem(allroles, JSON.stringify(roles));
}
const setonlyusers=(users)=>{
     localStorage.setItem(myusers, JSON.stringify(users));
}
const adduserdelete=(payload)=>{
    let user= localStorage.getItem(myusersdelete);
    user=JSON.parse(user);

        if(user.length==0){
            user=[];
            user.push(payload);
        }else{
            user.push(payload);

        }
  localStorage.setItem(myusersdelete, JSON.stringify(user));
}
const setonlyusersdelete=(users)=>{
    localStorage.setItem(myusersdelete, JSON.stringify(users));
}
const setEmpresas=(empresas)=>{
    localStorage.setItem(empresarUser, JSON.stringify(empresas));

}
const setPermisos=(empresas)=>{
    localStorage.setItem(permisos, JSON.stringify(empresas));

}
const logininicial=(result)=>{
    setRoles(result.roles);
    let user=result.user;
    user.roles=null;
    setUser(user);
    setToken(result.token);
    setLocale(user.lang); 
  //  localStorage.setItem(permisos, JSON.stringify(empresas));

}

/**
 * Guarda el token JWT
 * @param {String} token
 */
const setToken = (token)=>{
    localStorage.setItem(key, token);
}
const setLocale = (token)=>{
    localStorage.setItem(locale, token);
}
/**
 * Borra el token y regresca el localStorage
 */
const removeToken = async ()=>{
    localStorage.clear();
    await logout();
}

/**
 * Obtiene el token de inicio de sesión
 */
const getToken = ()=>{
    return localStorage.getItem(key);
};

/**
 * Guarda los datos de usuario en el navegador
 * @param {Object} user
 */

 const setphoto=(foto)=>{
     let user= localStorage.getItem(keyUser);
     user=JSON.parse(user);

     user.photo=foto;

   localStorage.setItem(keyUser, JSON.stringify(user));

    }
const setUser = (user)=>{
    localStorage.setItem(keyUser, JSON.stringify(user));
};

const setRoles=(roles)=>{
    localStorage.setItem(rolesUser, roles);

}
const setRoleActive=(role)=>{
    localStorage.setItem(KeyRoleactive,JSON.stringify(role));
}
/**
 * Obtiene los datos del usuario
 */
const getUser = () =>{
    let userCached = localStorage.getItem(keyUser);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
const getPermisos = () =>{
    let userCached = localStorage.getItem(permisos);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
const getOnlyUsers = () =>{
    let userCached = localStorage.getItem(myusers);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
const getOnlyUsersDelete = () =>{
    let userCached = localStorage.getItem(myusersdelete);

    if (userCached){
        return JSON.parse(userCached);
    }

    return null;
}
export default  ()=> ({
    setToken,
    removeToken,
    getToken,
    setUser,
    getUser,
    setRoles,
    logout,
    setEmpresas,
    setRoleActive,
    setPermisos,
    getPermisos,
    setphoto,
    setonlyusers,
    getOnlyUsers,
    setonlyusersdelete,
    getOnlyUsersDelete,adduserdelete,getallpermisos,setallpermisos,getallroles,setallroles,logininicial,setLocale
});
