import { type ValidationResult } from './validator.js';
export interface BuildOptions {
    outDir?: string;
    includeSource?: boolean;
}
export interface BuildResult extends ValidationResult {
    bundlePath?: string;
    outputDirectory?: string;
}
export declare function buildTaskKit(targetDir: string, options?: BuildOptions): Promise<BuildResult>;
