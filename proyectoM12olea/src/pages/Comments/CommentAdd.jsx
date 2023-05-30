import React, { useContext } from "react";
import { UserContext } from "../../userContext";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "./thunks";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import "./commentadd.css";

export const CommentAdd = ({id}) => {  
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => dispatch(addComment(id,data,authToken));

  return <div className="contenido contenidoaddplace">
          <h1>Add Comment</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="material-form">
            <div className="material-form__container">
              <input {...register("comment", {
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 20,
                      message: "El comentario tiene que tener mínimo 20 caracteres y tres palabras"
                    },
                    maxLength: {
                      value: 200,
                      message: "El comentario tiene que tener máximo 200 caracteres"
                    },
                    pattern: {
                      value: /^(?=(\b\w+\b\s?){3,})(?!\s).+$/,
                      message: "El comentario tiene que contener mínimo 3 palabras" 
                    }})} className="material-form__input" type="text" placeholder=" " id="comment"/>              
            </div>
            {errors.comment ? <div className="error">{errors.comment.message}</div> : <></>}
            <div className='botonera'>
              <button type="submit" className="material-form__button">Crear comment</button>
              <button className="central material-form__button" type='reset'>Reiniciar</button>
              
            </div>
          </form>
        </div>;
}
export default CommentAdd