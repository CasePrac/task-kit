import { describe, it, expect } from 'vitest';
import { validateTaskKit } from '../src/validator.js';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('validateTaskKit seam tests', () => {
  it('rejects invalid directory or missing task.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'task-test-'));
    const result = await validateTaskKit(tmpDir);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Missing required file: task.json');
  });

  it('validates a correct task kit folder structure and manifest', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'task-test-valid-'));
    fs.writeFileSync(
      path.join(tmpDir, 'task.json'),
      JSON.stringify({
        id: 'sample-task',
        version: '1.0.0',
        title: 'Sample Task',
        difficulty: 'beginner',
        category: 'fintech',
        submission: {
          startPath: '/dashboard',
          requiredRoutes: ['/dashboard'],
        },
        viewports: [{ id: 'desktop', width: 1440, height: 900 }],
      })
    );
    fs.writeFileSync(path.join(tmpDir, 'brief.md'), '# Brief\nDo something');
    fs.writeFileSync(path.join(tmpDir, 'openapi.yaml'), 'openapi: 3.0.0');

    const result = await validateTaskKit(tmpDir);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.manifest?.id).toBe('sample-task');
  });
});
