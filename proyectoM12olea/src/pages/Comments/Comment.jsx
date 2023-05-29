import "./comment.css";
import React from 'react';
import { UserContext } from "../../userContext";
import { useContext } from "react";
import TimeAgo from 'react-timeago';
import { useDispatch, useSelector } from "react-redux";
import spanishStrings from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { delComment } from "./thunks";

export const Comment = ({comment}) => {  
    const { usuari,setUsuari, authToken, setAuthToken } = useContext(UserContext);
    const { comments = [], page=0, isLoading=true, add=true, error="", commentsCount=0 } =
    useSelector((state) => state.comments);
    const dispatch = useDispatch();
    const formatter = buildFormatter(spanishStrings); 
    return(
        <>
                <div className="comment-main-level">
                    <div className="comment-avatar">
                        <img src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif" alt="" />
                    </div>
                    <div className="comment-box">
                        <div className="comment-head">
                            <h6 className="comment-name">{comment.user.name}</h6>
                            <span><TimeAgo date={comment.created_at} formatter={formatter} /></span>
                            {usuari == comment.user.email &&
                                <button  onClick={(e) => {dispatch(delComment(comment,authToken));}} className="delete iconos reviewdelete" title="Eliminar" type="submit"><i className="bi bi-trash3"></i></button>
                            }
                        </div>
                        <div className="comment-content">
                            {comment.comment}
                        </div>
                    </div>
                </div>
        </>
    )
}

export default Comment
