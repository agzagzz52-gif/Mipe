"use client";

import { useState } from "react";
import LandingHero from "./components/LandingHero";
import ChatInterface from "./components/ChatInterface";

export default function Home() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  // View: Landing Page
  if (!activeModule) {
    return (
      <main className="min-h-screen bg-black relative overflow-hidden selection:bg-blue-500/30">
        {/* Ambient Backlights */}
        <div className="absolute top-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />

        <LandingHero onModuleSelect={handleModuleSelect} />
      </main>
    );
  }

  // View: Full Screen Chat (Wizard Mode)
  return (
    <div className="h-screen w-full bg-black relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decor - Subtle Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

      {/* Back Button (Optional context return) */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => setActiveModule(null)}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <span className="text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
            Volver al Inicio
          </span>
        </button>
      </div>

      {/* Chat Container */}
      <div className="w-full h-full max-w-4xl relative z-10 flex flex-col bg-transparent">
        <ChatInterface initialContext={activeModule} key={activeModule} />
      </div>
    </div>
  );
}
