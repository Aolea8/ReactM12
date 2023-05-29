import React from 'react';
import { UserContext } from "../../userContext";
import { useContext, useState, useEffect } from "react";
import CommentAdd from "./CommentAdd";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { setCommentsCount } from "./commentSlice";
import { getComments } from "./thunks";
import Paginate from './Paginate';

export const CommentsList = ({ id, comments_count }) => {
  let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext);
  const dispatch = useDispatch();
  const { comments=[], page=0, add=true } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getComments(0, id, authToken,usuari));
    dispatch(setCommentsCount(comments_count));
  }, [page]);


  return(
    <>
  {comments.length > 0 ? (
    <div className="contenido">
      {/* <Paginate /> */}
      <div className="comments-container">
        <h1 style={{color: "white"}}>Comments</h1>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} id="comments-list" className="comments-list">
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      </div>
      {add && <div><CommentAdd id={id}/></div>}
      {/* <Paginate /> */}
    </div>
  ):(
    <>
      {add && <div><CommentAdd id={id}/></div>}
    </>
  )}
</>
  );
}

export default CommentsList