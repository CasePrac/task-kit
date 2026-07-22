import { describe, it, expect } from 'vitest';
import { validateTaskKit } from '../src/validator.js';
import * as path from 'path';
import * as fs from 'fs';

describe('Built-in Tasks Validation', () => {
  const tasksDir = path.resolve(process.cwd(), 'tasks');
  const taskFolders = fs.readdirSync(tasksDir);

  it('contains at least 10 pre-compiled task kits', () => {
    expect(taskFolders.length).toBeGreaterThanOrEqual(10);
  });

  taskFolders.forEach((folder) => {
    it(`validates tasks/${folder}`, async () => {
      const targetDir = path.join(tasksDir, folder);
      const result = await validateTaskKit(targetDir);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.manifest?.id).toBe(folder);
    });
  });
});
