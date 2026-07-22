import { describe, it, expect } from 'vitest';
import { validateTaskKit } from '../src/validator.js';
import { captureTaskKit } from '../src/capture.js';
import { buildTaskKit } from '../src/builder.js';
import * as path from 'path';
import * as fs from 'fs';

describe('Built-in Generic Example Task Validation', () => {
  const tasksDir = path.resolve(process.cwd(), 'tasks');
  const targetDir = path.join(tasksDir, 'generic-example-task');

  it('contains generic-example-task folder', () => {
    expect(fs.existsSync(targetDir)).toBe(true);
  });

  it('validates generic-example-task structure', async () => {
    const result = await validateTaskKit(targetDir);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.manifest?.id).toBe('generic-example-task');
  });

  it('captures Playwright baselines into baselines/', async () => {
    const result = await captureTaskKit(targetDir);
    expect(result.valid).toBe(true);
    expect(fs.existsSync(path.join(targetDir, 'baselines'))).toBe(true);
  });

  it('builds task kit bundle', async () => {
    const result = await buildTaskKit(targetDir);
    expect(result.valid).toBe(true);
    expect(result.bundlePath).toBeDefined();
  });
});

