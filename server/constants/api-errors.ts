export const API_ERRORS = {
  MISSING_PARAMS: {
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Repository owner and repo are required',
  },
  INVALID_FORMAT: {
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Invalid repository owner or repo format',
  },
  REPOSITORY_NOT_FOUND: {
    statusCode: 404,
    statusMessage: 'Not Found',
    message: 'Repository not found. Please check the repository name.',
  },
  RATE_LIMIT_EXCEEDED: {
    statusCode: 429,
    statusMessage: 'Too Many Requests',
    message: 'GitHub API rate limit exceeded. Please try again later.',
  },
  GITHUB_SERVER_ERROR: {
    statusCode: 503,
    statusMessage: 'Service Unavailable',
    message: 'GitHub API is temporarily unavailable. Please try again later.',
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    statusMessage: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again.',
  },
} as const;
