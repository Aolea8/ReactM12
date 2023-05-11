import { useState } from "react";
import React from "react";
import Register from "./Register";
import Login from "./Login";
import "./style.scss";
const LoginRegister = () => {
  // difere`cnai entre emprar i no emprar state

  let [login, setLogin] = useState(true);

  
  return (
    <div className="div-loginregister">
        {login ? 
            <Login setLogin={setLogin}/>
          : 
            <Register setLogin={setLogin}/>        
        }
      </div>
  );
}
export default LoginRegister