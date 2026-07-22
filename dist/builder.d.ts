import { type ValidationResult } from './validator.js';
export interface BuildResult extends ValidationResult {
    bundlePath?: string;
}
export declare function buildTaskKit(targetDir: string, outDir?: string): Promise<BuildResult>;
