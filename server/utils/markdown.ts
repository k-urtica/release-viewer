import type { MarkdownDocument } from 'comark';
import { createMarkdownParser } from 'comark';
import breaks from 'comark/plugins/breaks';
import security from 'comark/plugins/security';

// Blocklist approach: remove executable/external-loading tags and restrict URL protocols
// Initialized once at module scope and reused across requests (parser is stateless)
const parse = createMarkdownParser({
  plugins: [
    security({
      blockedTags: ['script', 'iframe', 'object', 'embed', 'link', 'style', 'base', 'meta'],
      allowedProtocols: ['http', 'https', 'ftp', 'ftps', 'mailto', 'tel', 'callto', 'sms', 'cid', 'xmpp', 'data'],
      allowDataImages: true, // Allow data:image URIs in img src
    }),
    breaks(), // Convert soft line breaks to <br>
  ],
});

/**
 * Parse release body into a serializable MarkdownDocument
 */
export function parseReleaseMarkdown(markdown: string): Promise<MarkdownDocument> {
  if (!markdown.trim()) {
    return Promise.resolve({ nodes: [], frontmatter: {}, meta: {} });
  }

  return parse(markdown);
}
