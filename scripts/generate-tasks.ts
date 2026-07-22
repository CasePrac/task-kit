import { scaffoldTaskKit } from '../src/scaffold.js';
import * as path from 'path';

// 10 Frontend UI Product Challenges (Webpages & Mobile App Screens)
const TASKS = [
  { slug: 'fintech-transfer-flow', title: 'Bank Transfer Flow', category: 'fintech', difficulty: 'intermediate' },
  { slug: 'ecommerce-checkout', title: 'E-Commerce Multi-Step Checkout', category: 'ecommerce', difficulty: 'intermediate' },
  { slug: 'kanban-board', title: 'Interactive Kanban Task Board', category: 'productivity', difficulty: 'advanced' },
  { slug: 'analytics-dashboard', title: 'Sales & Metrics Analytics Dashboard', category: 'analytics', difficulty: 'advanced' },
  { slug: 'auth-mfa-flow', title: 'Two-Factor Authentication Verification UI', category: 'auth-ui', difficulty: 'intermediate' },
  { slug: 'file-uploader-dragdrop', title: 'Drag & Drop Asset Uploader UI', category: 'forms', difficulty: 'beginner' },
  { slug: 'notification-center', title: 'In-App Realtime Notification Feed UI', category: 'communications', difficulty: 'beginner' },
  { slug: 'data-table-virtualized', title: 'Product Inventory Data Table UI', category: 'tables', difficulty: 'advanced' },
  { slug: 'chat-interface-stream', title: 'Live Streaming Chat Interface UI', category: 'messaging', difficulty: 'intermediate' },
  { slug: 'settings-api-keys', title: 'Developer API Keys Settings Page UI', category: 'settings', difficulty: 'beginner' },
] as const;

async function generateAll() {
  console.log('🎨 Generating 10 Frontend UI Product Challenge Task-Kits...');
  for (const t of TASKS) {
    const targetDir = path.resolve(process.cwd(), 'tasks', t.slug);
    await scaffoldTaskKit({
      slug: t.slug,
      title: t.title,
      category: t.category,
      difficulty: t.difficulty as any,
      targetDir,
    });
    console.log(`  ✓ Updated frontend UI task: tasks/${t.slug}`);
  }
  console.log('✅ Done! 10 Frontend UI Task-Kits ready in tasks/');
}

generateAll().catch(console.error);
