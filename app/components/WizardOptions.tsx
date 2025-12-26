"use client";

import { WizardTask, WizardOption } from "../lib/wizardData";

interface WizardOptionsProps {
  options: (WizardTask | WizardOption)[];
  onSelect: (option: WizardTask | WizardOption) => void;
  type?: "task" | "time" | "team" | "budget";
}

export default function WizardOptions({ options, onSelect, type = "task" }: WizardOptionsProps) {
  const isGrid = type === "task";
  const isTime = type === "time";

  // Updated Grid: Uses lg:grid-cols-4 for wider screens to use the "edges"
  return (
    <div className={`w-full animate-in fade-in slide-in-from-bottom-2 duration-500`}>

      <div className={`${isGrid ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' : 'flex flex-col gap-3'}`}>
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt)}
            className={`group relative flex flex-col items-start p-5 rounded-xl text-left transition-all duration-200
                bg-white/5 border border-white/10 hover:bg-blue-600/10 hover:border-blue-500/30 active:scale-[0.99]
                ${isGrid ? 'h-full min-h-[100px]' : ''}
                ${isTime ? 'p-6 gap-2' : ''}
            `}
          >
            <div className="flex w-full justify-between items-baseline mb-1">
              <span className={`font-semibold text-white group-hover:text-blue-200 transition-colors ${isTime ? 'text-lg text-blue-100' : 'text-sm md:text-base'}`}>
                {opt.label}
              </span>

              {/* SUB-LABEL (Standard) */}
              {'subLabel' in opt && opt.subLabel && !isTime && (
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-medium ml-2 shrink-0">
                  {opt.subLabel}
                </span>
              )}

              {/* BADGE (Task) */}
              {'badge' in opt && opt.badge && (
                <span className="text-[9px] uppercase tracking-wider bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold ml-2 shrink-0 border border-blue-500/10">
                  {opt.badge}
                </span>
              )}
            </div>

            {/* TIME OPTION SPECIFIC LAYOUT */}
            {isTime && 'benefit' in opt && 'risk' in opt ? (
              <div className="w-full space-y-2 mt-1">
                <p className="text-sm text-green-300/80 leading-snug">
                  <span className="font-bold text-green-400 uppercase text-[10px] tracking-wide mr-1.5">Beneficio:</span>
                  {opt.benefit}
                </p>
                <p className="text-sm text-orange-300/70 leading-snug">
                  <span className="font-bold text-orange-400 uppercase text-[10px] tracking-wide mr-1.5">Riesgo:</span>
                  {opt.risk}
                </p>
              </div>
            ) : (
              /* STANDARD DESCRIPTION */
              'description' in opt && opt.description && (
                <p className="text-xs text-white/50 group-hover:text-white/70 leading-relaxed mt-1">
                  {opt.description}
                </p>
              )
            )}

            {/* AI REASONING (Standard Footer - kept for Budget/Team) */}
            {'reasoning' in opt && opt.reasoning && !isTime && (
              <div className="mt-3 pt-3 border-t border-white/5 w-full">
                <p className="text-[11px] text-blue-200/70 italic leading-relaxed">
                  <span className="font-bold not-italic text-blue-400 mr-1">AI Insight:</span>
                  {opt.reasoning}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* MIPE INSIGHT FOOTER (Only for Time/Budget/Team steps to show the "Why") */}
      {(isTime || type === "budget" || type === "team") && (
        <div className="mt-4 p-3 bg-blue-900/10 border border-blue-500/10 rounded-lg max-w-2xl mx-auto flex items-start gap-3">
          <div className="p-1 rounded bg-blue-500/20 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-400">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="text-blue-300 text-xs font-bold uppercase tracking-wider">MIPE Insight • Lógica de Consultoría</p>
            <p className="text-blue-200/60 text-xs leading-relaxed">
              {isTime ? "¿Por qué estos tiempos? El cálculo incluye 10 días de desarrollo base, 5 días de integración de API y una ventana de seguridad para control de calidad (QA)." :
                type === "budget" ? "Estas estimaciones se basan en tarifas promedio de mercado en LATAM/US para perfiles verificados en 2024." :
                  "Tamaños de equipo optimizados para reducir la burocracia y maximizar la velocidad de entrega en células ágiles."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
