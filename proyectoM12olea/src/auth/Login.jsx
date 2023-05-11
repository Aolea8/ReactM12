import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
// import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form"; 
import { useLogin } from '../hooks/useLogin';
import "./style.scss";

export default function Login({ setLogin }) {

  let { authToken, setAuthToken } = useContext(UserContext);
    // let [error, setError] = useState("");
    const { register, handleSubmit } = useForm(); 
// const { formState, onInputChange } = useForm({

// email: "",
// password: "",

// });

// const {email,password} = formState

const { doLogin, error, setError} = useLogin();
const onSubmit = data => doLogin(data)

// const sendLogin = async (e) => {
    //   e.preventDefault();
    
    //   // Enviam dades a l'aPI i recollim resultat
    //   try {
    //     const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       method: "POST",
    //       body: JSON.stringify({ email, password })
    //     });
  
  
    //     const resposta = await data.json();
    //     if (resposta.success === true)       setAuthToken(resposta.authToken) ;
    //     else alert("La resposta no ha triomfat");
  
  
    //   } catch {
    //     console.log("Error");
    //     alert("catch");
    //   }
    // };
  





  return (
    <>

      <div class="login">
        <div class="login-header">
          <h1>Login</h1>
        </div>
        <div class="login-form">
          <i class="fa fa-user"></i>
          <h3>Correo:</h3>
            <input {...register("email")} 
            // name="email"
             type="text" class="form-control" placeholder="Email " id="UserName" 
            //  onChange={onInputChange} 
             />
          
          <h3>Password:</h3>
          <input {...register("password")} 
          // name="password"
           type="password" class="form-control" placeholder="Password" id="Password" 
          //  onChange={onInputChange}
          />
          <i class="fa fa-lock"></i>
        <br></br>
        <div className='div-buttons'>
        <div class="wrap">
        <button class="btn" onClick ={ handleSubmit(onSubmit)}> Login </button>
        
        {error ? <div>{error}</div> : <></>}
        </div>
        <div class="wrap">
        <button
          onClick={() => {
            setLogin(false);
          }}
          type="button" class="btn" >
          Registrate
        </button>
        </div>
        </div>
        </div>


      </div>
    </>
  );
}