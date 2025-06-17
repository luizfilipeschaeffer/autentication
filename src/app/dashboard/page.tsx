"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, ChevronLeft } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-900 relative">
      {/* Barra lateral */}
      {sidebarVisible && (
        <aside className="w-56 bg-gray-800 text-white flex flex-col items-center py-8 shadow-lg min-h-screen z-10">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <button
            onClick={handleLogout}
            className="mt-auto mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold transition-colors"
          >
            Logout
          </button>
        </aside>
      )}
      {/* Botão para esconder/mostrar barra lateral */}
      <button
        onClick={() => setSidebarVisible((v) => !v)}
        className={`absolute top-4 transition-all z-20 bg-gray-700 text-white p-2 rounded hover:bg-gray-600 shadow flex items-center justify-center ${sidebarVisible ? 'left-60' : 'left-4'}`}
        aria-label={sidebarVisible ? "Esconder menu" : "Mostrar menu"}
        style={{ transition: 'left 0.2s' }}
      >
        {sidebarVisible ? <ChevronLeft size={24} /> : <Menu size={24} />}
      </button>
      {/* Conteúdo principal */}
      <main className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl text-white font-bold">Bem-vindo ao Dashboard!</h1>
      </main>
    </div>
  );
} 