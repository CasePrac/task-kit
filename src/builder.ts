import * as fs from 'fs';
import * as path from 'path';
import { validateTaskKit, type ValidationResult } from './validator.js';

export interface BuildResult extends ValidationResult {
  bundlePath?: string;
}

export async function buildTaskKit(targetDir: string, outDir?: string): Promise<BuildResult> {
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
