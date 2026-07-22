import { describe, it, expect } from 'vitest';
import { scaffoldTaskKit } from '../src/scaffold.js';
import { validateTaskKit } from '../src/validator.js';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('scaffoldTaskKit seam tests', () => {
  it('scaffolds a valid task kit directory with default files', async () => {
    const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), 'scaffold-test-'));
    const targetDir = path.join(tmpBase, 'my-custom-task');

    await scaffoldTaskKit({
      slug: 'my-custom-task',
      title: 'My Custom Task',
      targetDir,
      category: 'productivity',
      difficulty: 'intermediate',
    });

    expect(fs.existsSync(path.join(targetDir, 'task.json'))).toBe(true);
    expect(fs.existsSync(path.join(targetDir, 'brief.md'))).toBe(true);
    expect(fs.existsSync(path.join(targetDir, 'openapi.yaml'))).toBe(true);

    const valResult = await validateTaskKit(targetDir);
    expect(valResult.valid).toBe(true);
    expect(valResult.manifest?.id).toBe('my-custom-task');
    expect(valResult.manifest?.title).toBe('My Custom Task');
  });
});
