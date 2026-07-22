import * as fs from 'fs';
import * as path from 'path';
import { validateTaskKit, type ValidationResult } from './validator.js';

export interface CaptureResult extends ValidationResult {
  baselinesDir?: string;
  capturedFiles?: string[];
}

export async function captureTaskKit(targetDir: string): Promise<CaptureResult> {
  const validation = await validateTaskKit(targetDir);

  if (!validation.valid || !validation.manifest) {
    return validation;
  }

  const baselinesDir = path.join(targetDir, 'baselines');
  if (!fs.existsSync(baselinesDir)) {
    fs.mkdirSync(baselinesDir, { recursive: true });
  }

  const capturedFiles: string[] = [];

  // Generate baseline snapshots for configured viewports
  validation.manifest.viewports.forEach((vp) => {
    const screenshotPath = path.join(baselinesDir, `${vp.id}.png`);
    // Placeholder 1x1 png buffer or baseline screenshot data
    const dummyPngBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );
    fs.writeFileSync(screenshotPath, dummyPngBuffer);
    capturedFiles.push(`${vp.id}.png`);
  });

  // Generate DOM snapshot JSON
  const domSnapshotPath = path.join(baselinesDir, 'dom-snapshot.json');
  const domSnapshot = {
    capturedAt: new Date().toISOString(),
    viewports: validation.manifest.viewports.map((v) => v.id),
    nodes: [
      { tag: 'header', text: validation.manifest.title },
      { tag: 'main', routes: validation.manifest.submission.requiredRoutes },
    ],
  };
  fs.writeFileSync(domSnapshotPath, JSON.stringify(domSnapshot, null, 2));
  capturedFiles.push('dom-snapshot.json');

  // Generate network trace JSON
  const networkTracePath = path.join(baselinesDir, 'network-traces.json');
  const networkTrace = {
    capturedAt: new Date().toISOString(),
    apiSpecTitle: validation.manifest.title,
    routes: validation.manifest.submission.requiredRoutes,
  };
  fs.writeFileSync(networkTracePath, JSON.stringify(networkTrace, null, 2));
  capturedFiles.push('network-traces.json');

  return {
    ...validation,
    baselinesDir,
    capturedFiles,
  };
}
