"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [dbStatus, setDbStatus] = useState<'ok' | 'error' | 'loading'>('loading');

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/db-status");
        if (res.ok) setDbStatus('ok');
        else setDbStatus('error');
      } catch {
        setDbStatus('error');
      }
    };
    checkDb();
    const interval = setInterval(checkDb, 10000); // checa a cada 10s
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Erro ao fazer login.");
        return;
      }
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Ícone de Home no canto superior esquerdo */}
      <Link href="/" className="absolute top-6 left-6 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white hover:text-gray-300 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
      </Link>
      {/* Status da conexão com o banco */}
      <div className="absolute top-2 right-2 text-xs">
        {dbStatus === 'loading' && <span className="text-gray-300">Verificando conexão...</span>}
        {dbStatus === 'ok' && <span className="text-green-400">Banco de dados: OK</span>}
        {dbStatus === 'error' && <span className="text-red-400">Banco de dados: Indisponível</span>}
      </div>
      {/* Lado esquerdo: Banner */}
      <div className="w-1/2 bg-gray-700 flex items-center justify-center">
        <span className="text-4xl text-white">Aqui</span>
      </div>
      {/* Lado direito: Login */}
      <div className="w-1/2 bg-black flex flex-col items-center justify-center relative">
        <h1 className="text-5xl text-white mb-12">Login</h1>
        <form className="flex flex-col gap-6 w-80" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="E-mail"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="bg-gray-800 text-white border border-gray-400 hover:bg-gray-700">Entrar</Button>
          <Link href="/register" className="w-full mt-2">
            <Button type="button" className="w-full border border-gray-400 text-gray-200 hover:bg-gray-700">Cadastrar-se</Button>
          </Link>
          {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
        </form>
      </div>
    </div>
  );
} 