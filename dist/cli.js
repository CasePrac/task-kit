#!/usr/bin/env node
import { Command } from 'commander';
import * as path from 'path';
import { scaffoldTaskKit } from './scaffold.js';
import { validateTaskKit } from './validator.js';
import { buildTaskKit } from './builder.js';
import { captureTaskKit } from './capture.js';
const program = new Command();
program
    .name('caseprac-task')
    .description('CLI tool to scaffold, validate, capture baselines, test, and build CasePrac Task Kits')
    .version('1.0.0');
program
    .command('init <slug>')
    .description('Scaffold a new Task-Kit directory')
    .option('-t, --title <title>', 'Human readable task title')
    .option('-c, --category <category>', 'Category slug (e.g. fintech, ecommerce)', 'general')
    .option('-d, --difficulty <difficulty>', 'Difficulty (beginner, intermediate, advanced)', 'intermediate')
    .option('-o, --out <dir>', 'Output directory path')
    .action(async (slug, options) => {
    const title = options.title || slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const targetDir = options.out ? path.resolve(options.out) : path.resolve(process.cwd(), slug);
    console.log(`🚀 Scaffolding new Task-Kit: ${slug}...`);
    await scaffoldTaskKit({
        slug,
        title,
        targetDir,
        category: options.category,
        difficulty: options.difficulty,
    });
    console.log(`✅ Created Task-Kit at: ${targetDir}`);
    console.log(`   - ${path.join(targetDir, 'task.json')}`);
    console.log(`   - ${path.join(targetDir, 'brief.md')}`);
    console.log(`   - ${path.join(targetDir, 'openapi.yaml')}`);
    console.log(`   - ${path.join(targetDir, 'reference/index.html')}`);
});
program
    .command('capture [dir]')
    .description('Capture Playwright baseline snapshots from reference solution')
    .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    console.log(`📸 Capturing Playwright baselines at: ${targetDir}...`);
    const result = await captureTaskKit(targetDir);
    if (result.valid && result.baselinesDir) {
        console.log(`✅ Playwright baselines captured successfully!`);
        console.log(`   Location: ${result.baselinesDir}`);
        result.capturedFiles?.forEach((f) => console.log(`   - ${f}`));
    }
    else {
        console.error(`❌ Capture failed.`);
        result.errors?.forEach((err) => console.error(`   - ${err}`));
        process.exit(1);
    }
});
program
    .command('validate [dir]')
    .description('Validate a Task-Kit directory against CasePrac schema')
    .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    console.log(`🔍 Validating Task-Kit at: ${targetDir}...`);
    const result = await validateTaskKit(targetDir);
    if (result.valid) {
        console.log(`✅ Task-Kit is valid!`);
        console.log(`   ID: ${result.manifest?.id}`);
        console.log(`   Title: ${result.manifest?.title}`);
        console.log(`   Category: ${result.manifest?.category}`);
        console.log(`   Difficulty: ${result.manifest?.difficulty}`);
    }
    else {
        console.error(`❌ Validation failed with ${result.errors.length} error(s):`);
        result.errors.forEach((err) => console.error(`   - ${err}`));
        process.exit(1);
    }
});
program
    .command('test [dir]')
    .description('Test Task-Kit evaluation specs and API syntax')
    .action(async (dir) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    console.log(`🧪 Testing Task-Kit evaluation specs at: ${targetDir}...`);
    const result = await validateTaskKit(targetDir);
    if (!result.valid) {
        console.error(`❌ Test failed. Task-Kit structure is invalid.`);
        result.errors.forEach((err) => console.error(`   - ${err}`));
        process.exit(1);
    }
    console.log(`✅ Tests passed:`);
    console.log(`   - [PASS] task.json schema structure`);
    console.log(`   - [PASS] brief.md content present`);
    console.log(`   - [PASS] openapi.yaml syntax valid`);
    console.log(`   - [PASS] Viewports: ${result.manifest?.viewports.map((v) => `${v.id}(${v.width}x${v.height})`).join(', ')}`);
});
program
    .command('build [dir]')
    .description('Build and package Task-Kit for submission or self-hosting')
    .option('-o, --out <dir>', 'Output directory for bundle')
    .option('--include-source', 'Bundle reference source code in release')
    .option('--no-include-source', 'Exclude reference source code from release')
    .action(async (dir, options) => {
    const targetDir = path.resolve(process.cwd(), dir || '.');
    console.log(`📦 Building Task-Kit at: ${targetDir}...`);
    const includeSource = options.includeSource !== undefined ? options.includeSource : undefined;
    const result = await buildTaskKit(targetDir, {
        outDir: options.out ? path.resolve(options.out) : undefined,
        includeSource,
    });
    if (result.valid && result.bundlePath) {
        console.log(`✅ Task-Kit built successfully!`);
        console.log(`   Bundle location: ${result.bundlePath}`);
    }
    else {
        console.error(`❌ Build failed.`);
        result.errors.forEach((err) => console.error(`   - ${err}`));
        process.exit(1);
    }
});
program.parse(process.argv);
