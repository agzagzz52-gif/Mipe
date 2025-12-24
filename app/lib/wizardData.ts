export type WizardTask = {
    id: string;
    label: string;
    description?: string;
};

export type WizardOption = {
    id: string;
    label: string;
    subLabel?: string;
    reasoning?: string; // AI explanation
};

export const COMMON_TASKS: Record<string, WizardTask[]> = {
    "data-analytics": [
        { id: "kpi-dashboard", label: "Dashboard Ejecutivo de KPIs", description: "Visibilidad en tiempo real de métricas clave." },
        { id: "data-warehouse", label: "Setup de Data Warehouse", description: "Centralizar datos de múltiples fuentes." },
        { id: "predictive-analytics", label: "Modelo Predictivo de Ventas", description: "Proyectar tendencias futuras." },
        { id: "customer-segmentation", label: "Segmentación de Clientes", description: "Agrupar clientes por comportamiento." },
        { id: "marketing-attribution", label: "Atribución de Marketing", description: "Medir ROI por canal." },
        { id: "inventory-optimization", label: "Optimización de Inventario", description: "Reducir stockouts y sobrestock." },
        { id: "fraud-odetection", label: "Sistema de Detección de Fraude", description: "Identificar transacciones anómalas." },
        { id: "churn-prediction", label: "Predicción de Fuga (Churn)", description: "Identificar clientes en riesgo." },
        { id: "sentiment-analysis", label: "Análisis de Sentimiento", description: "Analizar feedback de clientes." },
        { id: "custom-report", label: "Automatización de Reportes", description: "Eliminar reportes manuales en Excel." },
    ],
    "ai": [
        { id: "chatbot-sales", label: "Chatbot de Ventas AI", description: "Automatizar calificación de leads 24/7." },
        { id: "content-generation", label: "Generador de Contenido", description: "Posts, emails y copys automáticos." },
        { id: "lead-scoring", label: "Lead Scoring Predictivo", description: "Priorizar leads por probabilidad de cierre." },
        { id: "image-recognition", label: "Reconocimiento de Imágenes", description: "Control de calidad visual automático." },
        { id: "voice-assistant", label: "Asistente de Voz Interno", description: "Consultas a bases de datos por voz." },
        { id: "personalization", label: "Personalización Web", description: "Contenido dinámico por usuario." },
        { id: "legal-doc-review", label: "Revisor Legal AI", description: "Resumir y marcar riesgos en contratos." },
        { id: "hr-screening", label: "Filtrado de CVs", description: "Selección de candidatos por skills." },
        { id: "meeting-summarizer", label: "Resumidor de Reuniones", description: "Transcribir y extraer tareas." },
        { id: "custom-agent", label: "Agente AI a Medida", description: "Tareas especializadas de nicho." },
    ],
    // Fallback for others
    "default": [
        { id: "mvp-development", label: "Desarrollo de MVP", description: "Producto Mínimo Viable." },
        { id: "process-automation", label: "Automatización de Procesos", description: "Digitalizar flujos manuales." },
        { id: "legacy-modernization", label: "Modernización de Legacy", description: "Actualizar sistemas antiguos." },
        { id: "platform-integration", label: "Integración de Plataformas", description: "Conectar herramientas aisladas." },
        { id: "cloud-migration", label: "Migración a la Nube", description: "Pasar servidores locales a Cloud." },
        { id: "security-audit", label: "Auditoría de Ciberseguridad", description: "Identificar vulnerabilidades." },
        { id: "mobile-app", label: "App Móvil (iOS/Android)", description: "Aplicación nativa o híbrida." },
        { id: "ecommerce-setup", label: "Lanzamiento E-commerce", description: "Tienda online Shopify/WooCommerce." },
        { id: "crm-implementation", label: "Implementación CRM", description: "Setup de Salesforce/HubSpot." },
        { id: "custom-consulting", label: "Consultoría Estratégica", description: "Roadmap y asesoramiento tecnológico." },
    ]
};

export const TIME_ESTIMATES: WizardOption[] = [
    {
        id: "express",
        label: "5 Semanas",
        subLabel: "Ejecución Rápida",
        reasoning: "Pros: Resultados inmediatos y feedback rápido del mercado. Contras: Requiere dedicación intensiva y el alcance debe ser muy acotado para no sacrificar calidad."
    },
    {
        id: "standard",
        label: "6 Semanas",
        subLabel: "Ciclo Balanceado",
        reasoning: "Pros: Equilibrio ideal entre velocidad y calidad. Permite una semana extra de pruebas (QA) y refinamiento. Contras: Sigue siendo un ritmo exigente."
    },
    {
        id: "comprehensive",
        label: "7 Semanas",
        subLabel: "Enfoque Robusto",
        reasoning: "Pros: Mayor seguridad y margen de maniobra ante imprevistos. Ideal si buscas un acabado más pulido. Contras: El 'Time-to-Market' es un poco más lento."
    }
];

export const TEAM_SUGGESTIONS: WizardOption[] = [
    {
        id: "lean",
        label: "3 Personas",
        subLabel: "Equipo Ágil",
        reasoning: "Ideal para validación rápida. Menor costo de coordinación."
    },
    {
        id: "full",
        label: "5 Personas",
        subLabel: "Célula Estándar",
        reasoning: "Balance perfecto. Permite roles especializados (Backend, Frontend, Diseño)."
    },
    {
        id: "enterprise",
        label: "7 Personas",
        subLabel: "Escuadra Completa",
        reasoning: "Para proyectos ambiciosos. Incluye roles de QA, DevOps y Project Manager dedicado."
    }
];

export const BUDGET_OPTIONS: WizardOption[] = [
    {
        id: "low",
        label: "Bajo (Estudiantes/Juniors)",
        subLabel: "Económico",
        reasoning: "Pros: Ahorro significativo. Contras: Curva de aprendizaje y mayor riesgo técnico."
    },
    {
        id: "mid",
        label: "Medio (Profesionales)",
        subLabel: "Balanceado",
        reasoning: "Pros: Experiencia comprobada y buena relación costo-calidad. Contras: Inversión moderada."
    },
    {
        id: "high",
        label: "Alto (Agencia/Expertos)",
        subLabel: "Premium",
        reasoning: "Pros: Garantía de calidad, velocidad y soporte integral. Contras: Inversión alta."
    }
];
