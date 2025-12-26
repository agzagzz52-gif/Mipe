"use client";

import { useState, useRef, useEffect } from "react";
import WizardOptions from "./WizardOptions";
import { COMMON_TASKS, TIME_ESTIMATES, TEAM_SUGGESTIONS, BUDGET_OPTIONS, WizardTask, WizardOption } from "../lib/wizardData";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "ui";
    options?: (WizardTask | WizardOption)[];
    optionType?: "task" | "time" | "team" | "budget";
    timestamp: Date;
};

interface ChatInterfaceProps {
    initialContext?: string; // e.g. "Data Analytics"
}

type WizardStep = "INIT" | "TASK" | "TIME" | "TEAM" | "BUDGET" | "GOAL" | "GOAL_QNA" | "SUMMARY";

type StrategyConfig = {
    module?: string;
    task?: string;
    timeframe?: string;
    teamSize?: string;
    budget?: string;
    goal?: string;
};

export default function ChatInterface({ initialContext }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [wizardStep, setWizardStep] = useState<WizardStep>("INIT");
    const [config, setConfig] = useState<StrategyConfig>({});

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    // INITIALIZATION
    useEffect(() => {
        if (messages.length > 0) return;

        if (initialContext) {
            setConfig(prev => ({ ...prev, module: initialContext }));

            // Start immediately with Step A
            setTimeout(() => {
                triggerStep("TASK", initialContext);
            }, 500);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // PROMPT GENERATOR
    const triggerStep = (step: WizardStep, contextData?: string) => {
        setWizardStep(step);
        setIsTyping(true);

        const delay = step === "TASK" ? 400 : 600;

        setTimeout(() => {
            try {
                let promptText = "";
                let options: (WizardTask | WizardOption)[] = [];
                let optionType: "task" | "time" | "team" | "budget" | undefined;

                // Context Fallback logic
                const currentModule = config.module || initialContext || "default";

                // Data Lookup Helper
                const getTaskOptions = (mod: string) => {
                    const key = mod.toLowerCase().includes("data") ? "data-analytics"
                        : mod.toLowerCase().includes("ai") ? "ai"
                            : mod.toLowerCase().includes("marketing") ? "data-analytics"
                                : "default";
                    return COMMON_TASKS[key] || COMMON_TASKS["default"];
                };

                switch (step) {
                    case "TASK":
                        // ELITE CONSULTANT COPY
                        promptText = `**Análisis de Mercado Finalizado.**\nBasado en tu sector, estas son las rutas de mayor retorno de inversión (ROI) para PyMEs en 2025. ¿Hacia dónde enfocamos tu estrategia?`;

                        options = getTaskOptions(contextData || currentModule);
                        // Custom option updated: "Personalizar requerimiento específico"
                        options = [...options, { id: "custom", label: "Personalizar requerimiento específico", description: "Define un objetivo manualmente." }];
                        optionType = "task";
                        break;

                    case "TIME":
                        promptText = `**Cronograma de Ejecución Estimado.**\nLa IA ha calculado estos escenarios basándose en la complejidad técnica de **"${contextData}"** y estándares de estabilidad del sistema.`;
                        options = TIME_ESTIMATES;
                        optionType = "time";
                        break;

                    case "TEAM":
                        promptText = `Si buscaras apoyo para **${contextData}**, este sería el equipo sugerido (referencia):`;
                        options = TEAM_SUGGESTIONS;
                        optionType = "team";
                        break;

                    case "BUDGET":
                        promptText = `Inversión estimada para **${contextData}** personas:\n\n**1. Hazlo tú mismo** (Solo herramientas).\n**2. Apoyo Externo** (Promedios de mercado):`;
                        options = BUDGET_OPTIONS;
                        optionType = "budget";
                        break;

                    case "GOAL":
                        promptText = `¿Cuál es el propósito final de este proyecto?`;
                        options = [
                            { id: "answer_qs", label: "Contestar preguntas guía" },
                            { id: "gen_plan", label: "Generar plan estratégico" }
                        ];
                        optionType = "task";
                        break;

                    case "GOAL_QNA":
                        promptText = "¿Qué impacto específico esperas en ingresos o eficiencia? (Sé breve)";
                        options = [];
                        break;

                    case "SUMMARY":
                        promptText = `¡Listo! Generando Plan Estratégico...`;
                        console.log("FINAL CONFIG:", config);
                        break;
                }

                const newMsgs: Message[] = [
                    { id: `prompt-${step}`, role: "assistant", content: promptText, timestamp: new Date(), type: "text" }
                ];

                if (options.length > 0) {
                    newMsgs.push({
                        id: `opts-${step}`,
                        role: "assistant",
                        content: "",
                        type: "ui",
                        options: options,
                        optionType: optionType,
                        timestamp: new Date()
                    });
                }

                setMessages(prev => [...prev, ...newMsgs]);
            } catch (e) {
                console.error("Error in triggerStep:", e);
            } finally {
                setIsTyping(false);
            }
        }, delay);
    };

    // HANDLE OPTION CLICK
    const handleOptionSelect = (option: WizardTask | WizardOption) => {
        // 1. Add User Msg
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: option.label,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);

        // Handle Custom Flow
        if (option.id === "custom") {
            advanceWizard(option.label, wizardStep, true);
            return;
        }

        // Handle Goal Flow
        if (wizardStep === "GOAL") {
            if (option.id === "answer_qs") {
                triggerStep("GOAL_QNA");
                return;
            } else {
                triggerStep("SUMMARY");
                return;
            }
        }

        // 2. Advance (Force slight delay to ensure UI updates first)
        setTimeout(() => {
            advanceWizard(option.label, wizardStep);
        }, 100);
    };

    // HANDLE TEXT INPUT
    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Time Validation UX
        if (wizardStep === "TIME") {
            setIsTyping(true);
            setTimeout(() => {
                const validationMsg: Message = { id: `val-${Date.now()}`, role: "assistant", content: `Perfecto, ajustado a "${inputValue}".`, timestamp: new Date() };
                setMessages(prev => [...prev, validationMsg]);
                setTimeout(() => {
                    advanceWizard(inputValue, wizardStep);
                }, 800);
            }, 500);
            return;
        }

        advanceWizard(inputValue, wizardStep);
    };

    // Advance Logic
    const advanceWizard = (value: string, currentStep: WizardStep, isCustom: boolean = false) => {
        // Update Config
        setConfig(prev => {
            const next = { ...prev };
            switch (currentStep) {
                case "TASK": next.task = value; break;
                case "TIME": next.timeframe = value; break;
                case "TEAM": next.teamSize = value; break;
                case "BUDGET": next.budget = value; break;
                case "GOAL_QNA": next.goal = value; break;
            }
            return next;
        });

        if (currentStep === "TASK" && isCustom) {
            setIsTyping(true);
            setTimeout(() => {
                const propmt = { id: Date.now().toString(), role: "assistant", content: "Entendido. Describe tu necesidad:", timestamp: new Date(), type: "text" } as Message;
                setMessages(prev => [...prev, propmt]);
                setIsTyping(false);
            }, 500);
            return;
        }

        switch (currentStep) {
            case "TASK": triggerStep("TIME", value); break;
            case "TIME": triggerStep("TEAM", value); break;
            case "TEAM": triggerStep("BUDGET", value); break;
            case "BUDGET": triggerStep("GOAL", value); break;
            case "GOAL_QNA": triggerStep("SUMMARY", value); break;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formattedContext = initialContext ? initialContext.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()) : "";

    return (
        <div className="flex flex-col h-full overflow-hidden w-full relative">
            {/* COMPACT MINIMAL HEADER */}
            <header className="shrink-0 pt-4 pb-0 px-6 max-w-5xl mx-auto w-full text-center z-20">
                <p className="text-blue-400/80 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                    MIPE Assistant • Fase 2
                </p>
                <h1 className="text-xl md:text-3xl font-medium text-white tracking-tight mt-1">
                    {formattedContext}
                </h1>
            </header>

            {/* Messages Area - Reduced Padding */}
            <div className="flex-1 overflow-y-auto px-4 py-2 w-full max-w-6xl mx-auto scroll-smooth">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-center"}`}
                    >
                        {msg.type === "ui" && msg.options ? (
                            <div className="w-full my-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <WizardOptions
                                    options={msg.options}
                                    onSelect={handleOptionSelect}
                                    type={msg.optionType}
                                />
                            </div>
                        ) : (
                            <div
                                className={`max-w-[90%] md:max-w-[70%] px-5 py-3 rounded-2xl text-sm md:text-base leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-sm shadow-md mt-4"
                                        : "bg-transparent text-white/90 text-center font-light mt-2"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="w-full flex justify-center py-4">
                        <div className="flex gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Compact */}
            <div className="shrink-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none flex justify-center">
                <div className="pointer-events-auto w-full max-w-2xl glass rounded-full flex items-center p-1.5 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all shadow-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none px-5 text-base text-white placeholder-white/20 h-10"
                        placeholder={
                            wizardStep === "TASK" ? "Escribe tu necesidad..." :
                                wizardStep === "TIME" ? "Tiempo manual..." :
                                    "Responder..."
                        }
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
