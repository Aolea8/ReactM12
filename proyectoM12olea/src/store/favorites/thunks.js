import { setFavorito } from "./favoriteSlice";

export const favorite = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "http://equip07.insjoaquimmir.cat/api/favorite/"+id;
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setFavorito(true));
                console.log("Favorito Creado");
            } else {
                console.log("Ya tienes en favorito en este lugar");
            }
        } catch (e) {
            console.log("Error");
        }
    };
}

export const unfavorite = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE", 
        };
        const url = "http://equip07.insjoaquimmir.cat/api/unfavorite/"+id;
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setFavorito(false));
                console.log("Favorito Borrado");
            } else {
                console.log("No tienes en favoritos este lugar");
            }
        } catch (e) {
            console.log("Error");
        }
    };
}

export const comprobarFavorito = (id, authToken) => {
    return async (dispatch, getState) => {
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST", 
        };
        const url = "http://equip07.insjoaquimmir.cat/api/favorite/"+id;
        try {
            const data = await fetch(url, headers);
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(unfavorite(id, authToken));
               
            }else{
                dispatch(setFavorito(true));
            }
        } catch (e) {
            console.log("Error");
        }
    };
}