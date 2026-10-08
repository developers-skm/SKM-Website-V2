// Starts the Vite frontend and the Express backend together, so form
// submissions (quote / contact / careers) never hit a dead localhost:4000.
import { spawn } from 'node:child_process';

const procs = [
  spawn('npx vite', { stdio: 'inherit', shell: true }),
  spawn('npm run dev --prefix backend', { stdio: 'inherit', shell: true }),
];

const stop = () => procs.forEach((p) => p.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach((p) => p.on('exit', (code) => { stop(); process.exit(code ?? 0); }));
