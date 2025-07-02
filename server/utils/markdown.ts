import { marked } from 'marked';

/**
 * Converts Markdown text to HTML
 */
export function convertMarkdownToHtml(markdown: string): string {
  if (!markdown.trim()) {
    return '';
  }

  try {
    return marked.parse(markdown, {
      gfm: true,
      breaks: true,
      async: false
    });
  } catch (error) {
    console.error('Markdown conversion error:', error);
    return '';
  }
}
