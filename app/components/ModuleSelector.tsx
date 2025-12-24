import {
    BarChart3,
    Megaphone,
    ShieldCheck,
    Workflow,
    Bot,
    Code2,
    LayoutDashboard,
    MoreHorizontal
} from "lucide-react";

type ModuleOption = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
};

const modules: ModuleOption[] = [
    { id: "data", title: "Data Analytics", description: "Unlock insights from your business data", icon: BarChart3 },
    { id: "marketing", title: "Digital Marketing", description: "Optimize campaigns and reach", icon: Megaphone },
    { id: "security", title: "Cybersecurity", description: "Protect digital assets and compliance", icon: ShieldCheck },
    { id: "automation", title: "Automations", description: "Streamline repetitive workflows", icon: Workflow },
    { id: "ai", title: "AI Integration", description: "Deploy intelligent agents & models", icon: Bot },
    { id: "coding", title: "Programming", description: "Custom software development", icon: Code2 },
    { id: "dashboards", title: "Dashboards", description: "Real-time KPI visualization", icon: LayoutDashboard },
    { id: "other", title: "Other / Custom", description: "Specialized consulting needs", icon: MoreHorizontal },
];

interface ModuleSelectorProps {
    onSelect: (moduleId: string) => void;
}

export default function ModuleSelector({ onSelect }: ModuleSelectorProps) {
    return (
        <div className="w-full max-w-4xl mx-auto p-2 animate-in fade-in duration-700">
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4 font-medium pl-1">
                Select Operational Area
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.map((mod) => (
                    <button
                        key={mod.id}
                        onClick={() => onSelect(mod.id)}
                        className="group relative flex flex-col items-start p-4 h-32 rounded-xl text-left transition-all duration-300
              bg-white/5 border border-white/10 
              hover:bg-white/10 hover:border-blue-400/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]
              active:scale-[0.98]"
                    >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 w-full h-full flex flex-col justify-between">
                            <div className="p-2 bg-white/5 rounded-lg w-fit text-blue-400 group-hover:text-blue-300 group-hover:bg-blue-500/20 transition-colors">
                                <mod.icon size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                                    {mod.title}
                                </h4>
                                <p className="text-[10px] text-white/40 leading-tight mt-1 group-hover:text-white/60">
                                    {mod.description}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
