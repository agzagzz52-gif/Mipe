"use client";

import { useState, useRef, useEffect } from "react";
import WizardOptions from "./WizardOptions";
import { COMMON_TASKS, TIME_ESTIMATES, TEAM_SUGGESTIONS, BUDGET_OPTIONS, WizardTask, WizardOption } from "../lib/wizardData";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "ui";
    component?: React.ReactNode;
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
            // 1. Initial Prompt (Spanish)
            const formattedModule = initialContext.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
            const initialContent = `Has seleccionado **${formattedModule}**. Excelente elección. Soy tu consultor MIPE y voy a ayudarte a estructurar este proyecto y haremos tu plan estratégico.`;

            setConfig(prev => ({ ...prev, module: initialContext }));

            const initMessages: Message[] = [
                { id: "welcome", role: "assistant", content: initialContent, timestamp: new Date(), type: "text" }
            ];
            setMessages(initMessages);

            // Trigger Step A: Task Selection
            setTimeout(() => {
                triggerStep("TASK", initialContext);
            }, 1500);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // STATE MACHINE TRIGGER
    const triggerStep = (step: WizardStep, context?: string) => {
        setWizardStep(step);
        setIsTyping(true);

        setTimeout(() => {
            let promptText = "";
            let options: (WizardTask | WizardOption)[] = [];
            let optionType: "task" | "time" | "team" | "budget" | undefined;

            switch (step) {
                case "TASK":
                    promptText = `He investigado las tendencias actuales. Aquí tienes las 10 tareas más comunes para Microempresas (PyMEs) dentro de **${context || config.module}**. ¿Alguna se ajusta a tu necesidad?`;
                    const key = (context || config.module || "default").toLowerCase().includes("data") ? "data-analytics"
                        : (context || config.module || "default").toLowerCase().includes("ai") ? "ai"
                            : "default";
                    options = COMMON_TASKS[key] || COMMON_TASKS["default"];
                    // Add "Own Need" Option Logic is handled by the component rendering usually, or we push a fake option
                    // We will append a special option here or let user type.
                    // Appending for UI button consistency:
                    options = [...options, { id: "custom", label: "Escribir mi propia necesidad", description: "Define tu objetivo manualmente." }];
                    optionType = "task";
                    break;

                case "TIME":
                    promptText = `Entendido. Para **${config.task}**, he calculado los tiempos promedio de ejecución. Selecciona la duración que mejor se adapte a tu ritmo:`;
                    options = TIME_ESTIMATES;
                    optionType = "time";
                    break;

                case "TEAM":
                    promptText = `Para completar esto en **${config.timeframe}**, he estimado el equipo necesario.\n\n*Nota: Este equipo no es para contratación obligatoria, es para saber con cuántas personas contarías en caso de que necesites apoyo en partes del plan que no puedas hacer solo.*`;
                    options = TEAM_SUGGESTIONS;
                    optionType = "team";
                    break;

                case "BUDGET":
                    promptText = `Hablemos de inversión. He investigado dos escenarios: "Hazlo tú mismo" vs "Con Apoyo". Aquí tienes 3 estimaciones de costo para la ejecución:`;
                    options = BUDGET_OPTIONS;
                    optionType = "budget";
                    break;

                case "GOAL":
                    promptText = `Para finalizar, necesito entender la visión profunda del proyecto. ¿Cuál es la finalidad última de esto?`;
                    // Two buttons as requested
                    options = [
                        { id: "answer_qs", label: "Contestar preguntas guía" },
                        { id: "gen_plan", label: "Generar plan estratégico directamente" }
                    ];
                    optionType = "task"; // Reusing grid/list style
                    break;

                case "GOAL_QNA":
                    promptText = "Perfecto. Ayúdame respondiendo: ¿Qué impacto específico esperas en tus ingresos o eficiencia con este proyecto? (Responde brevemente)";
                    options = [];
                    break;

                case "SUMMARY":
                    promptText = `Configuración Completa. He guardado tu **final_strategy_config**. Estoy listo para generar el Plan de 7 Fases.`;
                    console.log("FINAL STRATEGY CONFIG:", config);
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
                    component: <WizardOptions options={options} onSelect={handleOptionSelect} type={optionType} />,
                    timestamp: new Date()
                });
            }

            setMessages(prev => [...prev, ...newMsgs]);
            setIsTyping(false);
        }, 1200);
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

        // Special Case: "Escribir mi propia necesidad"
        if (option.id === "custom") {
            setIsTyping(true);
            setTimeout(() => {
                const promptMsg: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Entendido. Por favor, describe tu necesidad o tarea específica:",
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, promptMsg]);
                setIsTyping(false);
            }, 600);
            return; // Wait for text input
        }

        // Special Case: Goal Flow
        if (wizardStep === "GOAL") {
            if (option.id === "answer_qs") {
                triggerStep("GOAL_QNA");
                return;
            } else {
                triggerStep("SUMMARY");
                return;
            }
        }

        // 2. Update Config & Advance
        advanceWizard(option.label, wizardStep);
    };

    // HANDLE TEXT INPUT
    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // 1. Add User Msg
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Special Validation Logic as requested by User for TIME Step
        if (wizardStep === "TIME") {
            setIsTyping(true);
            setTimeout(() => {
                const validationMsg: Message = {
                    id: `val-${Date.now()}`,
                    role: "assistant",
                    content: "Perfecto, ajustaremos el plan para cumplir en este plazo.",
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, validationMsg]);
                setTimeout(() => {
                    advanceWizard(inputValue, wizardStep);
                }, 1000);
            }, 600);
            return;
        }

        // 2. Update Config & Advance
        advanceWizard(inputValue, wizardStep);
    };

    const advanceWizard = (value: string, currentStep: WizardStep) => {
        const nextConfig = { ...config };

        switch (currentStep) {
            case "TASK":
                nextConfig.task = value;
                setConfig(nextConfig);
                triggerStep("TIME");
                break;
            case "TIME":
                nextConfig.timeframe = value;
                setConfig(nextConfig);
                triggerStep("TEAM");
                break;
            case "TEAM":
                nextConfig.teamSize = value;
                setConfig(nextConfig);
                triggerStep("BUDGET");
                break;
            case "BUDGET":
                nextConfig.budget = value;
                setConfig(nextConfig);
                triggerStep("GOAL");
                break;
            case "GOAL_QNA":
                // Accumulate Goal info
                nextConfig.goal = value;
                setConfig(nextConfig);
                // Prompt for more or finish? For now, finish per script.
                triggerStep("SUMMARY");
                break;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden w-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 w-full max-w-3xl mx-auto scroll-smooth">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                    >
                        {msg.type === "ui" && msg.component ? (
                            <div className="w-full my-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {msg.component}
                            </div>
                        ) : (
                            <div
                                className={`max-w-[85%] md:max-w-[80%] px-6 py-4 rounded-2xl text-base leading-relaxed shadow-sm ${msg.role === "user"
                                        ? "bg-blue-600/20 border border-blue-500/30 text-blue-100 rounded-tr-sm"
                                        : "bg-zinc-900/80 border border-white/10 text-zinc-100 rounded-tl-sm backdrop-blur-md"
                                    }`}
                            >
                                <div className="markdown-prose">
                                    {msg.content.split('\n').map((line, i) => (
                                        <p key={i} className="mb-1 last:mb-0">{line}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-900/80 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 rounded-full bg-blue-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 rounded-full bg-blue-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-white/5 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="max-w-3xl mx-auto glass rounded-2xl flex items-center p-2 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all shadow-2xl">
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none px-4 text-lg text-white placeholder-white/20 h-12"
                        placeholder={
                            wizardStep === "TASK" ? "O escribe tu propia necesidad..." :
                                wizardStep === "TIME" ? "Escribe un tiempo manual (ej. 3 meses)..." :
                                    "Escribe tu respuesta..."
                        }
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="w-12 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
