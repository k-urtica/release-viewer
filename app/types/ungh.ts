/**
 * Type definition for GitHubRelease used by ungh API
 *
 * @see https://github.com/unjs/ungh
 */
export interface GitHubRelease {
  id: number;
  tag: string;
  author: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  createdAt: string;
  publishedAt: string;
  markdown: string;
  html: string;
}

/**
 * Type for ungh API response
 */
export interface UnghReleasesResponse {
  releases: GitHubRelease[];
}

/**
 * Repository information type
 */
export interface RepositoryInfo {
  owner: string;
  name: string;
}
