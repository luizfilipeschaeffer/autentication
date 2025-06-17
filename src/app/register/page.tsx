"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [dbStatus, setDbStatus] = useState<'ok' | 'error' | 'loading'>('loading');
  const router = useRouter();

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
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, nome, sobrenome, email, email_recuperacao: emailRecuperacao, telefone, cpf, birth_date: birthDate, password, gender }),
      });
      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      if (!res.ok) {
        setError((data && data.message) || "Erro ao registrar.");
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
      {/* Status da conexão com o banco */}
      <div className="absolute top-2 right-2 text-xs">
        {dbStatus === 'loading' && <span className="text-gray-300">Verificando conexão...</span>}
        {dbStatus === 'ok' && <span className="text-green-400">Banco de dados: OK</span>}
        {dbStatus === 'error' && <span className="text-red-400">Banco de dados: Indisponível</span>}
      </div>
      {/* Ícone de Home no canto superior esquerdo */}
      <Link href="/" className="absolute top-6 left-6 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white hover:text-gray-300 transition-colors">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
        </svg>
      </Link>
      {/* Lado esquerdo: Formulário de Registro */}
      <div className="w-1/2 bg-black flex flex-col items-center justify-center relative">
        <h1 className="text-5xl text-white mb-12">Registrar</h1>
        <form className="flex flex-col gap-6 w-80" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nickname*"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Nome"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Sobrenome"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={sobrenome}
            onChange={e => setSobrenome(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail*"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="E-mail de recuperação"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={emailRecuperacao}
            onChange={e => setEmailRecuperacao(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Telefone"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
          />
          <Input
            type="text"
            placeholder="CPF"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Data de nascimento"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha*"
            className="bg-transparent border border-gray-400 text-white placeholder:text-gray-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <label className="text-white text-sm">Gênero</label>
          <select
            className="bg-white text-black border border-blue-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="" disabled>Selecione o gênero</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
            <option value="nao_binario">Não-binário</option>
            <option value="outro">Outro</option>
            <option value="prefiro_nao_dizer">Prefiro não dizer</option>
          </select>
          <Button type="submit" className="bg-gray-800 text-white border border-gray-400 hover:bg-gray-700">Registrar</Button>
          {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
        </form>
      </div>
      {/* Lado direito: Banner */}
      <div className="w-1/2 bg-gray-700 flex items-center justify-center">
        <span className="text-4xl text-white">Aqui</span>
      </div>
    </div>
  );
} 