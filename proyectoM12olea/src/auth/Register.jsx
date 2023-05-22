import React from 'react'
import { useState } from 'react';
import { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from 'react-router-dom';
// import { useForm } from '../hooks/useForm';
import { useForm } from "react-hook-form";
import "./style.scss";

export default function Register({ setLogin }) {
  let [formulari, setFormulari] = useState({});
  let [error, setError] = useState("");
  let { authToken, setAuthToken } = useContext(UserContext);
  const onSubmit = data => handleRegister(data);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  // const { formState, onInputChange } = useForm({

  //   name: "",

  //   email: "",

  //   password: "",

  //   password2: "",


  //   });
  //   const {name,email,password,password2  } = formState

  // const handleRegister = (e) => {
  //   e.preventDefault();

  //   //let { name, password, password2, email } = formState;
  //   alert(
  //     "He enviat les Dades:  " +
  //     name +
  //     "/" +
  //     email +
  //     "/" +
  //     password +
  //     "/" +
  //     password2
  //   );
  const handleRegister = async (formState) => {
    let { name, password, password2, email } = formState;


    // if (password2 !== password) {
    //   setError("Els passwords han de coincidir");
    //   return false;
    // }


    fetch("http://equip07.insjoaquimmir.cat/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      // Si els noms i les variables coincideix, podem simplificar
      body: JSON.stringify({ name, email, password })
    })
      .then((data) => data.json())
      .then((resposta) => {
        console.log(resposta);
        if (resposta.success === true) {
          alert(resposta.authToken);
          setAuthToken(resposta.authToken)
          navigate("/");
        }
        else {
          setError(resposta.message);
          console.log(resposta)
        }
      })

      .catch((data) => {
        console.log(data);
        alert("Catchch");
      });

    alert("He enviat les Dades:  " + email + "/" + password);
  };

  return (
    <>

    <div class="login">
      <div class="login-header">
        <h1>Registrate</h1>
      </div>
      <div class="login-form">
        <i class="fa fa-user"></i>
        <h3>Nombre:</h3>
          <input {...register("name")} 
          // name="email"
           type="text" class="form-control" placeholder="Name " id="UserName" 
          //  onChange={onInputChange} 
           />
        
        <h3>Correo:</h3>
        <input {...register("email")} 
        // name="password"
         type="text" class="form-control" placeholder="Email" id="Email" 
        //  onChange={onInputChange}
        /><i class="fa fa-user"></i>
        <h3>Contraseña:</h3>
          <input {...register("password")} 
          // name="email"
           type="password" class="form-control" placeholder="Password" id="Password" 
          //  onChange={onInputChange} 
           />
        {/* <h3>Repetir Contraseña:</h3>
          <input {...register("password")} 
          // name="email"
          type="password" class="form-control" placeholder="Password2 " id="Password2" 
          //  onChange={onInputChange} 
          /> */}
        <i class="fa fa-lock"></i>
      <br></br>
      <div className='div-buttons'>
      <div class="wrap">
      <button class="btn" onClick ={ handleSubmit(onSubmit)}> Registrar </button>
      
      {error ? <div>{error}</div> : <></>}
      </div>
      <div class="wrap">
      <button
        onClick={() => {
          setLogin(true);
        }}
        type="button" class="btn" >
        Ya tienes cuenta?
      </button>
      </div>
      </div>
      </div>
      </div>
    </>
  );
}