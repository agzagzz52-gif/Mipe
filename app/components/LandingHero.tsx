"use client";

import ModuleSelector from "./ModuleSelector";

interface LandingHeroProps {
    onModuleSelect: (moduleId: string) => void;
}

export default function LandingHero({ onModuleSelect }: LandingHeroProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 relative z-10 animate-in fade-in zoom-in duration-500">

            {/* Hero Content */}
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wider uppercase mb-4">
                    v2.0 • System Online
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                    MIPE
                </h1>
                <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto font-light">
                    Your Intelligent Cloud Architect & Digital Transformation Engine.
                </p>
                <p className="text-sm text-zinc-600 uppercase tracking-widest mt-8 font-medium">
                    Select an operational vector to begin
                </p>
            </div>

            {/* Module Grid */}
            <div className="w-full max-w-5xl">
                <ModuleSelector onSelect={onModuleSelect} />
            </div>

        </div>
    );
}
