import type { TaskDifficulty } from './schema.js';
export interface ScaffoldOptions {
    slug: string;
    title: string;
    targetDir: string;
    category?: string;
    difficulty?: TaskDifficulty;
}
export declare function scaffoldTaskKit(options: ScaffoldOptions): Promise<string>;
