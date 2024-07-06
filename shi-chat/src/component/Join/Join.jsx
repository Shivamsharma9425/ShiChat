import React, { useState } from "react";
import logo from "../../../public/whatsapp_3.png"
import { Link } from "react-router-dom";

let user;

const sendUser = () =>{
  user =  document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
}
const Join = () => {


  const [name,setName] = useState("")
  return (
    <div className="joinPage">
      <div className="mainContainer">
        <img src={logo} alt="" />
        <h1>Shi-Chat</h1>
        <input  onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
        <Link onClick={(e)=> !name ? e.preventDefault():null} to="/chat"><button onClick={sendUser} id="joinBtn">Join</button></Link>
      </div>
    </div>
  );
};

export default Join;
export {user};