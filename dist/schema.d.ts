import { z } from 'zod';
export declare const TaskDifficultySchema: z.ZodEnum<["beginner", "intermediate", "advanced"]>;
export type TaskDifficulty = z.infer<typeof TaskDifficultySchema>;
export declare const ViewportSpecSchema: z.ZodObject<{
    id: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    width: number;
    height: number;
}, {
    id: string;
    width: number;
    height: number;
}>;
export type ViewportSpec = z.infer<typeof ViewportSpecSchema>;
export declare const TaskSubmissionSpecSchema: z.ZodObject<{
    startPath: z.ZodString;
    requiredRoutes: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    startPath: string;
    requiredRoutes: string[];
}, {
    startPath: string;
    requiredRoutes: string[];
}>;
export type TaskSubmissionSpec = z.infer<typeof TaskSubmissionSpecSchema>;
export declare const VisualEvalSpecSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    maxDiffPixelRatio: z.ZodDefault<z.ZodNumber>;
    threshold: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    maxDiffPixelRatio: number;
    threshold: number;
}, {
    enabled?: boolean | undefined;
    maxDiffPixelRatio?: number | undefined;
    threshold?: number | undefined;
}>;
export declare const FunctionalEvalSpecSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled?: boolean | undefined;
}>;
export declare const AccessibilityEvalSpecSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    maxViolations: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    maxViolations: number;
}, {
    enabled?: boolean | undefined;
    maxViolations?: number | undefined;
}>;
export declare const EvaluationSpecSchema: z.ZodObject<{
    timeoutMs: z.ZodDefault<z.ZodNumber>;
    visual: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        maxDiffPixelRatio: z.ZodDefault<z.ZodNumber>;
        threshold: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        maxDiffPixelRatio: number;
        threshold: number;
    }, {
        enabled?: boolean | undefined;
        maxDiffPixelRatio?: number | undefined;
        threshold?: number | undefined;
    }>>;
    functional: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
    }, {
        enabled?: boolean | undefined;
    }>>;
    accessibility: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        maxViolations: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        maxViolations: number;
    }, {
        enabled?: boolean | undefined;
        maxViolations?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    timeoutMs: number;
    visual: {
        enabled: boolean;
        maxDiffPixelRatio: number;
        threshold: number;
    };
    functional: {
        enabled: boolean;
    };
    accessibility: {
        enabled: boolean;
        maxViolations: number;
    };
}, {
    timeoutMs?: number | undefined;
    visual?: {
        enabled?: boolean | undefined;
        maxDiffPixelRatio?: number | undefined;
        threshold?: number | undefined;
    } | undefined;
    functional?: {
        enabled?: boolean | undefined;
    } | undefined;
    accessibility?: {
        enabled?: boolean | undefined;
        maxViolations?: number | undefined;
    } | undefined;
}>;
export declare const ScoringRubricSchema: z.ZodObject<{
    visualWeight: z.ZodDefault<z.ZodNumber>;
    functionalWeight: z.ZodDefault<z.ZodNumber>;
    accessibilityWeight: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    visualWeight: number;
    functionalWeight: number;
    accessibilityWeight: number;
}, {
    visualWeight?: number | undefined;
    functionalWeight?: number | undefined;
    accessibilityWeight?: number | undefined;
}>;
export declare const TaskManifestSchema: z.ZodObject<{
    id: z.ZodString;
    version: z.ZodString;
    title: z.ZodString;
    difficulty: z.ZodEnum<["beginner", "intermediate", "advanced"]>;
    category: z.ZodString;
    summary: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    includeReferenceSource: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    devCommand: z.ZodOptional<z.ZodString>;
    submission: z.ZodObject<{
        startPath: z.ZodString;
        requiredRoutes: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        startPath: string;
        requiredRoutes: string[];
    }, {
        startPath: string;
        requiredRoutes: string[];
    }>;
    viewports: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        width: number;
        height: number;
    }, {
        id: string;
        width: number;
        height: number;
    }>, "many">;
    evaluation: z.ZodDefault<z.ZodObject<{
        timeoutMs: z.ZodDefault<z.ZodNumber>;
        visual: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            maxDiffPixelRatio: z.ZodDefault<z.ZodNumber>;
            threshold: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            maxDiffPixelRatio: number;
            threshold: number;
        }, {
            enabled?: boolean | undefined;
            maxDiffPixelRatio?: number | undefined;
            threshold?: number | undefined;
        }>>;
        functional: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
        }, {
            enabled?: boolean | undefined;
        }>>;
        accessibility: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            maxViolations: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            maxViolations: number;
        }, {
            enabled?: boolean | undefined;
            maxViolations?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timeoutMs: number;
        visual: {
            enabled: boolean;
            maxDiffPixelRatio: number;
            threshold: number;
        };
        functional: {
            enabled: boolean;
        };
        accessibility: {
            enabled: boolean;
            maxViolations: number;
        };
    }, {
        timeoutMs?: number | undefined;
        visual?: {
            enabled?: boolean | undefined;
            maxDiffPixelRatio?: number | undefined;
            threshold?: number | undefined;
        } | undefined;
        functional?: {
            enabled?: boolean | undefined;
        } | undefined;
        accessibility?: {
            enabled?: boolean | undefined;
            maxViolations?: number | undefined;
        } | undefined;
    }>>;
    scoring: z.ZodDefault<z.ZodObject<{
        visualWeight: z.ZodDefault<z.ZodNumber>;
        functionalWeight: z.ZodDefault<z.ZodNumber>;
        accessibilityWeight: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        visualWeight: number;
        functionalWeight: number;
        accessibilityWeight: number;
    }, {
        visualWeight?: number | undefined;
        functionalWeight?: number | undefined;
        accessibilityWeight?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    version: string;
    title: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    category: string;
    includeReferenceSource: boolean;
    submission: {
        startPath: string;
        requiredRoutes: string[];
    };
    viewports: {
        id: string;
        width: number;
        height: number;
    }[];
    evaluation: {
        timeoutMs: number;
        visual: {
            enabled: boolean;
            maxDiffPixelRatio: number;
            threshold: number;
        };
        functional: {
            enabled: boolean;
        };
        accessibility: {
            enabled: boolean;
            maxViolations: number;
        };
    };
    scoring: {
        visualWeight: number;
        functionalWeight: number;
        accessibilityWeight: number;
    };
    summary?: string | undefined;
    description?: string | undefined;
    devCommand?: string | undefined;
}, {
    id: string;
    version: string;
    title: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    category: string;
    submission: {
        startPath: string;
        requiredRoutes: string[];
    };
    viewports: {
        id: string;
        width: number;
        height: number;
    }[];
    summary?: string | undefined;
    description?: string | undefined;
    includeReferenceSource?: boolean | undefined;
    devCommand?: string | undefined;
    evaluation?: {
        timeoutMs?: number | undefined;
        visual?: {
            enabled?: boolean | undefined;
            maxDiffPixelRatio?: number | undefined;
            threshold?: number | undefined;
        } | undefined;
        functional?: {
            enabled?: boolean | undefined;
        } | undefined;
        accessibility?: {
            enabled?: boolean | undefined;
            maxViolations?: number | undefined;
        } | undefined;
    } | undefined;
    scoring?: {
        visualWeight?: number | undefined;
        functionalWeight?: number | undefined;
        accessibilityWeight?: number | undefined;
    } | undefined;
}>;
export type TaskManifest = z.infer<typeof TaskManifestSchema>;
