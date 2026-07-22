import { type TaskManifest } from './schema.js';
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    manifest?: TaskManifest;
    briefMarkdown?: string;
    apiSpecYaml?: string;
}
export declare function validateTaskKit(targetDir: string): Promise<ValidationResult>;
