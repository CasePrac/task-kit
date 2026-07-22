import * as fs from 'fs';
import * as path from 'path';
import parseYaml from 'yaml';
import { TaskManifestSchema } from './schema.js';
export async function validateTaskKit(targetDir) {
    const errors = [];
    if (!fs.existsSync(targetDir) || !fs.statSync(targetDir).isDirectory()) {
        return {
            valid: false,
            errors: [`Directory does not exist or is not a directory: ${targetDir}`],
        };
    }
    const taskJsonPath = path.join(targetDir, 'task.json');
    const briefMdPath = path.join(targetDir, 'brief.md');
    const openapiYamlPath = path.join(targetDir, 'openapi.yaml');
    let manifest;
    let briefMarkdown;
    let apiSpecYaml;
    // 1. Verify task.json
    if (!fs.existsSync(taskJsonPath)) {
        errors.push('Missing required file: task.json');
    }
    else {
        try {
            const rawJson = fs.readFileSync(taskJsonPath, 'utf-8');
            const parsed = JSON.parse(rawJson);
            const zodResult = TaskManifestSchema.safeParse(parsed);
            if (!zodResult.success) {
                zodResult.error.issues.forEach((issue) => {
                    errors.push(`task.json validation error [${issue.path.join('.')}]: ${issue.message}`);
                });
            }
            else {
                manifest = zodResult.data;
            }
        }
        catch (e) {
            errors.push(`Failed to parse task.json: ${e.message}`);
        }
    }
    // 2. Verify brief.md
    if (!fs.existsSync(briefMdPath)) {
        errors.push('Missing required file: brief.md');
    }
    else {
        briefMarkdown = fs.readFileSync(briefMdPath, 'utf-8');
        if (!briefMarkdown.trim()) {
            errors.push('brief.md file is empty');
        }
    }
    // 3. Verify openapi.yaml (if present or mandatory)
    if (fs.existsSync(openapiYamlPath)) {
        apiSpecYaml = fs.readFileSync(openapiYamlPath, 'utf-8');
        try {
            parseYaml.parse(apiSpecYaml);
        }
        catch (e) {
            errors.push(`Invalid openapi.yaml syntax: ${e.message}`);
        }
    }
    return {
        valid: errors.length === 0,
        errors,
        manifest,
        briefMarkdown,
        apiSpecYaml,
    };
}
