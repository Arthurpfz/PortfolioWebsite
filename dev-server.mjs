import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), 'PortfolioWebsite');
const child = spawn('node', [join(root, 'node_modules', '.bin', 'astro'), 'dev', '--port', '4321'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, FORCE_COLOR: '1' }
});
child.on('exit', (code) => process.exit(code));
