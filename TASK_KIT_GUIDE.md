# CasePrac Task-Kit Authoring & Community Guide

Welcome to the **CasePrac Task-Kit** documentation. This guide details how to build, test, validate, and publish custom product challenges for the CasePrac evaluation platform or contribute them to the official community tasks repository ([CasePrac/tasks](https://github.com/CasePrac/tasks)).

---

## 1. What is a Task-Kit?

A **Task-Kit** is a standard directory layout containing everything required by CasePrac to evaluate a developer's frontend implementation:

```
my-custom-task/
├── task.json        # Task metadata, viewports, scoring rubric, and route requirements
├── brief.md         # Markdown instructions and acceptance criteria for candidates
└── openapi.yaml     # OpenAPI 3.0 specification for mock API contracts
```

---

## 2. Quickstart with CLI (`npx caseprac-task`)

You can create, test, and package task kits directly using the `caseprac-task` CLI tool.

### Scaffold a New Task
To scaffold a generic task kit structure:
```bash
npx caseprac-task init my-custom-task --title "My Custom Task" --category "fintech" --difficulty "intermediate"
```

This creates a new folder `my-custom-task` with boilerplate `task.json`, `brief.md`, and `openapi.yaml`.

### Validate Task Structure & Manifest
To verify that your task kit matches CasePrac schema constraints:
```bash
npx caseprac-task validate ./my-custom-task
```

### Test Evaluation Specs
To verify API contracts and viewport configurations:
```bash
npx caseprac-task test ./my-custom-task
```

### Build & Package for Release
To package your task for contribution or local deployment:
```bash
npx caseprac-task build ./my-custom-task
```

---

## 3. Detailed File Specifications

### `task.json` (Manifest)
The `task.json` file configures evaluation criteria and scoring weights:

```json
{
  "id": "my-custom-task",
  "version": "1.0.0",
  "title": "My Custom Task",
  "difficulty": "intermediate",
  "category": "fintech",
  "summary": "Short single-line description of the challenge",
  "description": "Full description of expected user flow and requirements",
  "submission": {
    "startPath": "/custom-task",
    "requiredRoutes": ["/custom-task", "/custom-task/confirm"]
  },
  "viewports": [
    { "id": "desktop", "width": 1440, "height": 900 },
    { "id": "mobile", "width": 390, "height": 844 }
  ],
  "evaluation": {
    "timeoutMs": 120000,
    "visual": { "enabled": true, "maxDiffPixelRatio": 0.02, "threshold": 0.2 },
    "functional": { "enabled": true },
    "accessibility": { "enabled": true, "maxViolations": 0 }
  },
  "scoring": {
    "visualWeight": 50,
    "functionalWeight": 40,
    "accessibilityWeight": 10
  }
}
```

### `brief.md` (Challenge Instructions)
Provide detailed, clear instructions in standard GitHub-flavored Markdown. Explain requirements, expected UI interactions, and keyboard accessibility criteria.

### `openapi.yaml` (API Contract)
Defines the mock API endpoints provided to candidate submissions during functional evaluation.

---

## 4. Community Contribution Workflow (GitHub & Self-Hosting)

### Option A: Contributing to Community Tasks Repository
1. Fork [https://github.com/CasePrac/tasks](https://github.com/CasePrac/tasks).
2. Scaffold your task using `npx caseprac-task init <slug>`.
3. Fill in custom requirements in `brief.md`, API contracts in `openapi.yaml`, and scoring in `task.json`.
4. Run `npx caseprac-task test ./<slug>` to verify zero errors.
5. Create a Pull Request (PR) to the `CasePrac/tasks` repository.

### Option B: Local Self-Hosting Integration
For self-hosted instances of CasePrac:
1. Drop your task kit folder into the `./tasks` directory of your CasePrac instance.
2. Run database sync seeder:
   ```bash
   pnpm --filter @caseprac/db db:seed
   ```
3. Your custom task will instantly appear on the `/challenges` catalog!
