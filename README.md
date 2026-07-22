# @caseprac/task-kit

Open-source developer kit and CLI for creating, validating, testing, building, and contributing task kits for the [CasePrac](https://github.com/CasePrac) platform.

## Features
- **10 Core Built-in Tasks**: Pre-compiled production challenges across Fintech, E-Commerce, Productivity, Security, and AI.
- **CLI Scaffolder**: Quickly generate valid tasks with `npx caseprac-task init`.
- **Validation Engine**: Zero-dependency Zod validator ensuring `task.json`, `brief.md`, and `openapi.yaml` compliance.
- **TDD Verified**: Built using Test-Driven Development with Vitest seam tests.

## Installation & Usage

```bash
# Scaffold a new task
npx caseprac-task init my-custom-task

# Validate task kit
npx caseprac-task validate ./my-custom-task

# Test evaluation specifications
npx caseprac-task test ./my-custom-task

# Build task bundle
npx caseprac-task build ./my-custom-task
```

For complete documentation, see [TASK_KIT_GUIDE.md](./TASK_KIT_GUIDE.md).

## License
[APACHE-2.0](LICENSE)

