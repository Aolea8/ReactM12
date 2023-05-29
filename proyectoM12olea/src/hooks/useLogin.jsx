import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    let { setAuthToken,setUsuariId,setUsuari } = useContext(UserContext);
    // localStorage = window.localStorage;


    async function checkAuthToken() {
        try {
            let localAuthToken = localStorage.getItem("authToken")
            console.log(localAuthToken)
            if (localAuthToken) {

                const data = await fetch("http://equip07.insjoaquimmir.cat/api/user", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + localAuthToken,
                    },
                    method: "GET",
                });
                const resposta =  await data.json();

                if (resposta.success) {
                    setAuthToken(localAuthToken);
                    setUsuariId(resposta.user.id);
                    setUsuari(resposta.user.email);
                    navigate("/");
                } else {
                    console.log("INVALID local storage auth token")
                    localStorage.removeItem("authToken")
                }
            } else {
                console.log("No auth token at local storage")
            }
        } catch (e) {
            setError(e);
        }
    }
    const doLogin = async (formState) => {
        //setError("");   
        try {
            const data = await fetch("http://equip07.insjoaquimmir.cat/api/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify( formState )
            });
            const resposta =  await data.json();
            if (resposta.success === true) {
                console.log(resposta)
                setAuthToken(resposta.authToken);
                localStorage.setItem("authToken",resposta.authToken)
                checkAuthToken();
            }
            else setError(resposta.message);
        } catch(e) {
            console.log(e.err);
            alert("Catchch");
        };
    }
    useEffect(() => {
        checkAuthToken();
    }, [])



    return { error, doLogin };
}