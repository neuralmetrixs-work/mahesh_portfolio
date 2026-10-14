const { execSync } = require('child_process');
const cwd = 'c:\\Users\\Ashwin Kumar\\Desktop\\Mahesh_port';

console.log('1. Initializing Git repository...');
console.log(execSync('git init', { cwd, encoding: 'utf8' }).trim());
execSync('git branch -M main', { cwd });

console.log('2. Staging files...');
execSync('git add .', { cwd });

console.log('3. Committing...');
try {
  console.log(execSync('git commit -m "Initial commit: Mahesh Gadakh portfolio website"', { cwd, encoding: 'utf8' }).trim());
} catch (e) {
  console.log('Commit note:', e.stdout ? e.stdout.toString() : e.message);
}

console.log('4. Authenticating with neuralmetrixs-work...');
const input = 'protocol=https\nhost=github.com\nusername=neuralmetrixs-work\n\n';
const credOut = execSync('git credential fill', { input, encoding: 'utf8' });
const token = credOut.split('\n').find(l => l.startsWith('password='))?.split('=')[1]?.trim();

const remoteAuthUrl = `https://neuralmetrixs-work:${token}@github.com/neuralmetrixs-work/mahesh_portfolio.git`;
try {
  execSync('git remote remove origin', { cwd, stdio: 'ignore' });
} catch (_) {}
execSync(`git remote add origin ${remoteAuthUrl}`, { cwd });

console.log('5. Pushing to origin main...');
const pushOut = execSync('git push -u origin main', { cwd, encoding: 'utf8' });
console.log(pushOut);

// Clean origin URL so token is not retained in .git/config
execSync('git remote set-url origin https://github.com/neuralmetrixs-work/mahesh_portfolio.git', { cwd });
console.log('6. Push completed and remote origin secured.');
