import type { MarkdownDocument, Node } from 'comark';
import { textContent } from 'comark/utils';

/** Approximate preview length in characters */
const BUDGET = 300;

function countText(node: Node): number {
  return textContent(node).length;
}

/**
 * Trim a MarkdownDocument for preview rendering.
 * Cuts at block boundaries so the structure is preserved.
 * Returns null when the result is empty (e.g. the first block exceeds the budget).
 */
export function trimDocument(doc: MarkdownDocument, budget = BUDGET): MarkdownDocument | null {
  const nodes: Node[] = [];
  let total = 0;

  for (const node of doc.nodes) {
    if (typeof node === 'string') {
      if (total + node.length > budget) {
        nodes.push(node.slice(0, budget - total)); // Keep the text that fits within the budget
        total = budget;
        break;
      }
      total += node.length;
      nodes.push(node);
      continue;
    }
    const len = countText(node);
    if (total + len > budget) break; // Drop elements that exceed the budget entirely
    total += len;
    nodes.push(node);
  }

  return nodes.length ? { ...doc, nodes } : null;
}
