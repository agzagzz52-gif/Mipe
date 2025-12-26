export type WizardTask = {
    id: string;
    label: string;
    description?: string;
    badge?: string; // New: Badge for "High Impact", etc.
};

export type WizardOption = {
    id: string;
    label: string;
    subLabel?: string;
    benefit?: string; // New: Why is it good?
    risk?: string;    // New: What's the trade-off?
    reasoning?: string; // AI explanation/Insight
    description?: string;
};

export const COMMON_TASKS: Record<string, WizardTask[]> = {
    "data-analytics": [
        { id: "kpi-dashboard", label: "Dashboard Ejecutivo de KPIs", description: "Visibilidad en tiempo real de métricas clave.", badge: "ALTO IMPACTO" },
        { id: "data-warehouse", label: "Setup de Data Warehouse", description: "Centralizar datos de múltiples fuentes.", badge: "INFRAESTRUCTURA" },
        { id: "predictive-analytics", label: "Modelo Predictivo de Ventas", description: "Proyectar tendencias futuras.", badge: "IA AVANZADA" },
        { id: "customer-segmentation", label: "Segmentación de Clientes", description: "Agrupar clientes por comportamiento.", badge: "MARKETING" },
        { id: "marketing-attribution", label: "Atribución de Marketing", description: "Medir ROI por canal." },
        { id: "inventory-optimization", label: "Optimización de Inventario", description: "Reducir stockouts y sobrestock.", badge: "EFICIENCIA" },
        { id: "fraud-odetection", label: "Sistema de Detección de Fraude", description: "Identificar transacciones anómalas." },
        { id: "churn-prediction", label: "Predicción de Fuga (Churn)", description: "Identificar clientes en riesgo.", badge: "RETENCIÓN" },
        { id: "sentiment-analysis", label: "Análisis de Sentimiento", description: "Analizar feedback de clientes." },
        { id: "custom-report", label: "Automatización de Reportes", description: "Eliminar reportes manuales en Excel.", badge: "AHORRO TIEMPO" },
    ],
    "ai": [
        { id: "chatbot-sales", label: "Chatbot de Ventas AI", description: "Automatizar calificación de leads 24/7.", badge: "VENTAS 24/7" },
        { id: "content-generation", label: "Generador de Contenido", description: "Posts, emails y copys automáticos.", badge: "MARKETING" },
        { id: "lead-scoring", label: "Lead Scoring Predictivo", description: "Priorizar leads por probabilidad de cierre.", badge: "EFICIENCIA" },
        { id: "image-recognition", label: "Reconocimiento de Imágenes", description: "Control de calidad visual automático." },
        { id: "voice-assistant", label: "Asistente de Voz Interno", description: "Consultas a bases de datos por voz." },
        { id: "personalization", label: "Personalización Web", description: "Contenido dinámico por usuario.", badge: "UX" },
        { id: "legal-doc-review", label: "Revisor Legal AI", description: "Resumir y marcar riesgos en contratos." },
        { id: "hr-screening", label: "Filtrado de CVs", description: "Selección de candidatos por skills." },
        { id: "meeting-summarizer", label: "Resumidor de Reuniones", description: "Transcribir y extraer tareas.", badge: "PRODUCTIVIDAD" },
        { id: "custom-agent", label: "Agente AI a Medida", description: "Tareas especializadas de nicho." },
    ],
    // Fallback for others
    "default": [
        { id: "mvp-development", label: "Desarrollo de MVP", description: "Producto Mínimo Viable.", badge: "STARTUP" },
        { id: "process-automation", label: "Automatización de Procesos", description: "Digitalizar flujos manuales.", badge: "EFICIENCIA" },
        { id: "legacy-modernization", label: "Modernización de Legacy", description: "Actualizar sistemas antiguos." },
        { id: "platform-integration", label: "Integración de Plataformas", description: "Conectar herramientas aisladas.", badge: "CONECTIVIDAD" },
        { id: "cloud-migration", label: "Migración a la Nube", description: "Pasar servidores locales a Cloud.", badge: "ESCALABILIDAD" },
        { id: "security-audit", label: "Auditoría de Ciberseguridad", description: "Identificar vulnerabilidades.", badge: "CRÍTICO" },
        { id: "mobile-app", label: "App Móvil (iOS/Android)", description: "Aplicación nativa o híbrida.", badge: "MOVILIDAD" },
        { id: "ecommerce-setup", label: "Lanzamiento E-commerce", description: "Tienda online Shopify/WooCommerce.", badge: "VENTAS" },
        { id: "crm-implementation", label: "Implementación CRM", description: "Setup de Salesforce/HubSpot." },
        { id: "custom-consulting", label: "Consultoría Estratégica", description: "Roadmap y asesoramiento tecnológico." },
    ]
};

export const TIME_ESTIMATES: WizardOption[] = [
    {
        id: "express",
        label: "Sprint de Lanzamiento (5 Semanas)",
        subLabel: "Ejecución Rápida",
        benefit: "Ideal para validación rápida en mercado.",
        risk: "Documentación técnica simplificada y deuda técnica potencial.",
        reasoning: "Sprint Intensivo. Pros: Feedback inmediato del mercado. Contras: Alta carga de trabajo y menor tiempo para iterar detalles estéticos."
    },
    {
        id: "standard",
        label: "Ciclo de Implementación Estándar (6 Semanas)",
        subLabel: "Opción Recomendada",
        benefit: "Equilibrio óptimo entre velocidad y calidad.",
        risk: "Requiere coordinación fluida para no generar bloqueos.",
        reasoning: "Ritmo Estándar. Pros: Permite 1 semana de QA y pruebas de usuario. Contras: Requiere coordinación fluida para no atrasarse."
    },
    {
        id: "comprehensive",
        label: "Despliegue de Alta Disponibilidad (7 Semanas)",
        subLabel: "Enfoque Robusto",
        benefit: "Enfoque en escalabilidad y seguridad a largo plazo.",
        risk: "Time-to-market más lento.",
        reasoning: "Holgura Estratégica. Pros: Mayor seguridad técnica y pulido final. Ideal si hay integraciones complejas. Contras: Time-to-market más lento."
    }
];

export const TEAM_SUGGESTIONS: WizardOption[] = [
    {
        id: "lean",
        label: "3 Personas",
        subLabel: "Equipo Ágil",
        reasoning: "Ideal para validación rápida. Roles sugeridos: 1 Dev Fullstack, 1 Diseñador/PM, 1 Especialista del dominio. Menor costo de coordinación."
    },
    {
        id: "full",
        label: "5 Personas",
        subLabel: "Célula Estándar",
        reasoning: "Balance perfecto. Roles sugeridos: 2 Devs, 1 UX/UI, 1 PM, 1 QA. Permite paralelizar tareas frontend y backend."
    },
    {
        id: "enterprise",
        label: "7 Personas",
        subLabel: "Escuadra Completa",
        reasoning: "Alta velocidad. Incluye especialistas dedicados (DevOps, Data Scientist). Requiere una gestión de proyecto rigurosa."
    }
];

export const BUDGET_OPTIONS: WizardOption[] = [
    {
        id: "low",
        label: "Bajo (Juniors/Estudiantes)",
        subLabel: "Económico",
        reasoning: "Talento emergente. Pros: Costo muy accesible ($1k - $3k aprox). Contras: Requiere mucha supervisión tuya y la curva de aprendizaje puede retrasar el plan."
    },
    {
        id: "mid",
        label: "Medio (Profesionales)",
        subLabel: "Balanceado",
        reasoning: "Freelancers con experiencia. Pros: Buena relación calidad-precio ($5k - $12k). Saben auto-gestionarse. Contras: Disponibilidad variable."
    },
    {
        id: "high",
        label: "Alto (Agencias/Expertos)",
        subLabel: "Premium",
        reasoning: "Socio Tecnológico. Pros: Garantía de resultados, equipo multidiscliplinario y soporte post-lanzamiento ($15k+). Contras: Inversión significativa."
    }
];
