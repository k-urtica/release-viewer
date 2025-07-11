import { Octokit } from '@octokit/rest';

export function useOctokit() {
  return new Octokit({ auth: useRuntimeConfig().githubToken });
}

export function isOctokitError(error: unknown): error is { status: number; message: string } {
  return (
    error !== null &&
    typeof error === 'object' &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
}
