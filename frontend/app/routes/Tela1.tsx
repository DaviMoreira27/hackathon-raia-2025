import React from "react";
import "./Tela1.css";

function Tela1() {
  return (
    <div className="tela1-container">
      <h1>Insira seu URL do YouTube no espaço abaixo!</h1>
      <div className="input-group">
        <input type="text" placeholder="Insira seu URL" />
        <button>Enviar</button>
      </div>
    </div>
  );
}

export default Tela1;
