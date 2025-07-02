/**
 * GitHub API related types for release viewer
 */

/**
 * Repository information type
 */
export interface RepositoryInfo {
  owner: string;
  name: string;
}

/**
 * GitHub Release information
 * Simplified interface based on GitHub API response
 */
export interface GitHubRelease {
  id: number;
  tag: string;
  author: string;
  authorAvatarUrl: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  createdAt: string;
  publishedAt: string | null;
  markdown: string;
  html: string;
}

/**
 * API response wrapper for releases
 */
export interface ReleasesResponse {
  releases: GitHubRelease[];
}

/**
 * Error response from API
 */
export interface ApiError {
  statusCode: number;
  statusMessage: string;
  message: string;
}
