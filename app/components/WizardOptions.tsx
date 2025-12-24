"use client";

import { WizardTask, WizardOption } from "../lib/wizardData";

interface WizardOptionsProps {
    options: (WizardTask | WizardOption)[];
    onSelect: (option: WizardTask | WizardOption) => void;
    type?: "task" | "time" | "team" | "budget";
}

export default function WizardOptions({ options, onSelect, type = "task" }: WizardOptionsProps) {
    const isGrid = type === "task"; // Tasks look better in small grid, others in lists with details

    return (
        <div className={`w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ${isGrid ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col gap-3'}`}>
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onSelect(opt)}
                    className="group relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-200
            bg-white/5 border border-white/10 hover:bg-blue-600/10 hover:border-blue-500/30 active:scale-[0.99]"
                >
                    <div className="flex w-full justify-between items-baseline mb-1">
                        <span className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                            {opt.label}
                        </span>
                        {'subLabel' in opt && opt.subLabel && (
                            <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
                                {opt.subLabel}
                            </span>
                        )}
                    </div>

                    {'description' in opt && opt.description && (
                        <p className="text-xs text-white/60 group-hover:text-white/80 leading-relaxed">
                            {opt.description}
                        </p>
                    )}

                    {'reasoning' in opt && opt.reasoning && (
                        <div className="mt-3 pt-3 border-t border-white/5 w-full">
                            <p className="text-[10px] text-blue-200/80 italic leading-relaxed">
                                <span className="font-bold not-italic text-blue-400 mr-1">AI Insight:</span>
                                {opt.reasoning}
                            </p>
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
}
