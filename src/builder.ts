import * as fs from 'fs';
import * as path from 'path';
import { validateTaskKit, type ValidationResult } from './validator.js';

export interface BuildOptions {
  outDir?: string;
  includeSource?: boolean;
}

export interface BuildResult extends ValidationResult {
  bundlePath?: string;
  outputDirectory?: string;
}

export async function buildTaskKit(targetDir: string, options: BuildOptions = {}): Promise<BuildResult> {
  const validation = await validateTaskKit(targetDir);

  if (!validation.valid || !validation.manifest) {
    return validation;
  }

  const outputDirectory = options.outDir || path.join(targetDir, '.dist');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const shouldIncludeSource = options.includeSource ?? validation.manifest.includeReferenceSource ?? false;

  // Copy task files
  fs.copyFileSync(path.join(targetDir, 'task.json'), path.join(outputDirectory, 'task.json'));
  fs.copyFileSync(path.join(targetDir, 'brief.md'), path.join(outputDirectory, 'brief.md'));
  fs.copyFileSync(path.join(targetDir, 'openapi.yaml'), path.join(outputDirectory, 'openapi.yaml'));

  // Copy baselines if present
  const baselinesDir = path.join(targetDir, 'baselines');
  if (fs.existsSync(baselinesDir)) {
    const outBaselines = path.join(outputDirectory, 'baselines');
    fs.cpSync(baselinesDir, outBaselines, { recursive: true });
  }

  // Copy reference source if requested
  const referenceDir = path.join(targetDir, 'reference');
  if (shouldIncludeSource && fs.existsSync(referenceDir)) {
    const outReference = path.join(outputDirectory, 'reference');
    fs.cpSync(referenceDir, outReference, { recursive: true });
  }

  const bundleManifestPath = path.join(outputDirectory, 'task.bundle.json');
  const bundle = {
    ...validation.manifest,
    briefMarkdown: validation.briefMarkdown,
    apiSpecYaml: validation.apiSpecYaml,
    includeReferenceSource: shouldIncludeSource,
    builtAt: new Date().toISOString(),
  };

  fs.writeFileSync(bundleManifestPath, JSON.stringify(bundle, null, 2));

  return {
    ...validation,
    bundlePath: bundleManifestPath,
    outputDirectory,
  };
}
