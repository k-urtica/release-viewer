import gitUrlParse from 'git-url-parse';

export function parseRepository(input: string): RepositoryInfo | null {
  if (!input) return null;

  try {
    const parsed = gitUrlParse(input);

    if (parsed.source !== 'github.com') {
      return null;
    }

    return { owner: parsed.owner, repo: parsed.name };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function openGitHubRelease(repository: RepositoryInfo, release: GitHubRelease) {
  const url = `https://github.com/${repository.owner}/${repository.repo}/releases/tag/${release.tag}`;
  window.open(url, '_blank', 'noopener');
}

export function isGitHubUrl(input: string): boolean {
  return input.startsWith('https://github.com/');
}

/**
 * Get the full repository name in the format "owner/repo"
 */
export function getRepoName(repository: RepositoryInfo): string {
  return `${repository.owner}/${repository.repo}`;
}

export function getReleaseTitle(release: GitHubRelease): string {
  return release.name || release.tag;
}
