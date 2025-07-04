/**
 * GitHub API related types for release viewer
 */

/**
 * Repository information type
 */
export interface RepositoryInfo {
  owner: string;
  repo: string;
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
  html: string;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  currentPage: number;
  perPage: number;
  totalCount?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page?: number;
  per_page?: number;
}

/**
 * API response wrapper for releases
 */
export interface ReleasesResponse {
  releases: GitHubRelease[];
  pagination: PaginationInfo;
}

/**
 * Error response from API
 */
export interface ApiError {
  statusCode: number;
  statusMessage: string;
  message: string;
}
