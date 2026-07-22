import * as fs from 'fs';
import * as path from 'path';
import { validateTaskKit } from './validator.js';
export async function buildTaskKit(targetDir, outDir) {
    const validation = await validateTaskKit(targetDir);
    if (!validation.valid || !validation.manifest) {
        return validation;
    }
    const outputDirectory = outDir || path.join(targetDir, '.dist');
    if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true });
    }
    const bundleManifestPath = path.join(outputDirectory, 'task.bundle.json');
    const bundle = {
        ...validation.manifest,
        briefMarkdown: validation.briefMarkdown,
        apiSpecYaml: validation.apiSpecYaml,
        builtAt: new Date().toISOString(),
    };
    fs.writeFileSync(bundleManifestPath, JSON.stringify(bundle, null, 2));
    return {
        ...validation,
        bundlePath: bundleManifestPath,
    };
}
