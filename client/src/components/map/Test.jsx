import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBjM2ZiMDFjMWU3NDE1NWQ3ZjVmZWMiLCJpYXQiOjE2MTUxMjExNjR9.d5upKO5D7L7vNAc9zhETOqzaKwfdrBxXpceY-C4P3Dw";
let socket;
const Test = () => {
  const [input, setInput] = useState("");
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBjM2ZiMDFjMWU3NDE1NWQ3ZjVmZWMiLCJpYXQiOjE2MTUxMjExNjR9.d5upKO5D7L7vNAc9zhETOqzaKwfdrBxXpceY-C4P3Dw");

  useEffect(()=>{

    //return () => socket.disconnect();
  },[]);

  const handleJoin = () => {
    socket = io("http://localhost:5001/", {
      query: {
        token: token,
        orgId: input,
      },
    });

    socket.on('join',(data)=>{
      console.log('join: ',data);
    })

    socket.on('test',data=>console.log('test->',data));
  };

  const testEvent=()=>{
    socket.emit("join", "5283920058631409231");
  }
  return (
    <div>
      <p>OrgId</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <p>Token</p>
      <input value={token} onChange={(e) => setToken(e.target.value)} />
      <br/>
      <button onClick={handleJoin}>Join</button>
      <br/>
      <button onClick={testEvent}>Test</button>
    </div>
  );
};

export default Test;
