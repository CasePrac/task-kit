import * as fs from 'fs';
import * as path from 'path';
import type { TaskManifest, TaskDifficulty } from './schema.js';

export interface ScaffoldOptions {
  slug: string;
  title: string;
  targetDir: string;
  category?: string;
  difficulty?: TaskDifficulty;
}

export async function scaffoldTaskKit(options: ScaffoldOptions): Promise<string> {
  const { slug, title, targetDir, category = 'general', difficulty = 'intermediate' } = options;

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const manifest: TaskManifest = {
    id: slug,
    version: '1.0.0',
    title,
    difficulty,
    category,
    summary: `Build ${title} according to design specs and API contracts.`,
    description: `Implement the full ${title} workflow including forms, validation, and accessibility.`,
    includeReferenceSource: false,
    devCommand: 'npm run dev',
    submission: {
      startPath: `/${slug}`,
      requiredRoutes: [`/${slug}`],
    },
    viewports: [
      { id: 'desktop', width: 1440, height: 900 },
      { id: 'mobile', width: 390, height: 844 },
    ],
    evaluation: {
      timeoutMs: 120000,
      visual: { enabled: true, maxDiffPixelRatio: 0.02, threshold: 0.2 },
      functional: { enabled: true },
      accessibility: { enabled: true, maxViolations: 0 },
    },
    scoring: {
      visualWeight: 50,
      functionalWeight: 40,
      accessibilityWeight: 10,
    },
  };

  const briefMarkdown = `# ${title}

## Overview
Implement the **${title}** task according to the specification below.

## Requirements
1. **Route \`/${slug}\`**:
   - Render initial interface layout.
   - Handle form inputs and user interactions.
   - Connect to fixture API endpoints defined in \`openapi.yaml\`.

## Acceptance Criteria
- Fully keyboard navigable (WCAG 2.1 AA compliant).
- Matches reference viewports (1440x900 desktop, 390x844 mobile).
- Proper loading and error states.
`;

  const apiSpecYaml = `openapi: 3.0.3
info:
  title: ${title} Fixture API
  version: 1.0.0
paths:
  /api/${slug}:
    get:
      summary: Fetch data for ${title}
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: ok
`;

  const referenceHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} Reference</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; }
    .card { background: #1e293b; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title} Reference App</h1>
    <p>Reference implementation used by Playwright capture runner.</p>
  </div>
</body>
</html>
`;

  fs.writeFileSync(path.join(targetDir, 'task.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(targetDir, 'brief.md'), briefMarkdown);
  fs.writeFileSync(path.join(targetDir, 'openapi.yaml'), apiSpecYaml);

  const referenceDir = path.join(targetDir, 'reference');
  if (!fs.existsSync(referenceDir)) {
    fs.mkdirSync(referenceDir, { recursive: true });
  }
  fs.writeFileSync(path.join(referenceDir, 'index.html'), referenceHtml);

  return targetDir;
}
