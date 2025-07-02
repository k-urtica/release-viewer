import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML
 */
export function sanitizeHtml(html: string): string {
  if (!html.trim()) {
    return '';
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'br',
      'hr',
      'ul',
      'ol',
      'li',
      'blockquote',
      'code',
      'pre',
      'strong',
      'em',
      'del',
      'ins',
      'u',
      'a',
      'img',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'details',
      'summary',
      'div',
      'span',
    ],
    ALLOWED_ATTR: [
      'href',
      'title',
      'alt',
      'src',
      'class',
      'id',
      'align',
      'width',
      'height',
      'target',
      'rel',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target'],
    ADD_DATA_URI_TAGS: ['img'],
  });
}
