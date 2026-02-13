import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

const IGNORE_PATTERNS = [
  'node_modules', '.git', 'dist', '.cache', '.config', '.local',
  '.upm', '.replit', 'replit.nix', '.nix-store', 'package-lock.json',
  'scripts/push-to-github.ts', '.breakpoints', 'generated-icon.png',
  'attached_assets', 'server/replit_integrations', 'client/replit_integrations',
  'tmp', '.npm', '.node_repl_history'
];

function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some(p => filePath.startsWith(p) || filePath.includes('/' + p));
}

function getAllFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    if (shouldIgnore(relativePath)) continue;
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

async function main() {
  const owner = 'NishaChauhan-ctrl';
  const repo = 'PRD-Generator';
  const branch = 'main';
  const projectDir = '/home/runner/workspace';

  console.log('Getting GitHub access token...');
  const accessToken = await getAccessToken();
  const octokit = new Octokit({ auth: accessToken });

  console.log(`Pushing to ${owner}/${repo} on branch ${branch}...`);

  let baseSha: string;
  try {
    const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
    baseSha = ref.object.sha;
    console.log(`Found existing branch, base SHA: ${baseSha}`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log('Branch not found, trying "master"...');
      const { data: ref } = await octokit.git.getRef({ owner, repo, ref: `heads/master` });
      baseSha = ref.object.sha;
      console.log(`Found master branch, base SHA: ${baseSha}`);
    } else {
      throw e;
    }
  }

  const { data: baseCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: baseSha });

  const files = getAllFiles(projectDir);
  console.log(`Found ${files.length} files to upload...`);

  const treeItems: any[] = [];

  for (const file of files) {
    const fullPath = path.join(projectDir, file);
    const content = fs.readFileSync(fullPath);

    const isBinary = content.some((byte: number) => byte === 0);

    if (isBinary) {
      const { data: blob } = await octokit.git.createBlob({
        owner, repo,
        content: content.toString('base64'),
        encoding: 'base64'
      });
      treeItems.push({ path: file, mode: '100644' as const, type: 'blob' as const, sha: blob.sha });
    } else {
      const { data: blob } = await octokit.git.createBlob({
        owner, repo,
        content: content.toString('utf-8'),
        encoding: 'utf-8'
      });
      treeItems.push({ path: file, mode: '100644' as const, type: 'blob' as const, sha: blob.sha });
    }

    if (treeItems.length % 20 === 0) {
      console.log(`  Uploaded ${treeItems.length}/${files.length} files...`);
    }
  }

  console.log('Creating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner, repo,
    base_tree: baseCommit.tree.sha,
    tree: treeItems
  });

  console.log('Creating commit...');
  const { data: newCommit } = await octokit.git.createCommit({
    owner, repo,
    message: 'Update ScopeCreep - AI-powered PM toolkit with full feature set',
    tree: tree.sha,
    parents: [baseSha]
  });

  let targetBranch = branch;
  try {
    await octokit.git.updateRef({
      owner, repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    });
  } catch {
    targetBranch = 'master';
    await octokit.git.updateRef({
      owner, repo,
      ref: `heads/master`,
      sha: newCommit.sha
    });
  }

  console.log(`Successfully pushed to https://github.com/${owner}/${repo}/tree/${targetBranch}`);
  console.log(`Commit: ${newCommit.sha}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
