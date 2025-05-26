"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  async function efetuarLogin(e: React.FormEvent) {
    e.preventDefault();

    const resposta = await fetch("http://localhost:5268/api/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
    });

    if(!resposta.ok){
        alert("Login ou senha incorretos!");
        return;
    }

    const token = await resposta.text();
    localStorage.setItem('token', token);
    router.push("/produto/listar");
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={efetuarLogin}>
        <div id="email">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div id="senha">
          <label htmlFor="senha">Senha:</label>
          <input
            type="text"
            name="senha"
            id="senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
