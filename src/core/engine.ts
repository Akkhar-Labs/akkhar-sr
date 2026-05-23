import { PatchBlock, MatchResult } from '../types/patch';

/**
 * Akkhar Code Patcher Core Engine
 * Contains pure logic for surgical matching and content reconstruction.
 * Zero dependencies on VS Code APIs to ensure portability and testability.
 */

/**
 * Identifies the line-based coordinates for a set of surgical blocks.
 * Uses a sliding-window algorithm to handle line-ending and whitespace variations.
 */
export function findMatches(
  docLines: string[],
  blocks: PatchBlock[],
  onError: (message: string, block?: PatchBlock) => void,
): MatchResult[] | null {
  const matches: MatchResult[] = [];

  for (const block of blocks) {
    const searchLines = block.search.split('\n');
    let foundLineIndex = -1;

    for (let i = 0; i <= docLines.length - searchLines.length; i++) {
      let isMatch = true;
      for (let j = 0; j < searchLines.length; j++) {
        // Structural comparison: Ignore both leading and trailing whitespace to handle AI indentation drift
        if (docLines[i + j].trim() !== searchLines[j].trim()) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        if (foundLineIndex !== -1) {
          onError(
            `Block [${block.index}] is ambiguous (multiple matches found).`,
            block,
          );
          return null;
        }
        foundLineIndex = i;
      }
    }

    if (foundLineIndex === -1) {
      onError(`Block [${block.index}] not found in the source content.`, block);
      return null;
    }

    matches.push({
      startLine: foundLineIndex,
      endLine: foundLineIndex + searchLines.length - 1,
      replace: block.replace,
      index: block.index,
    });
  }

  return matches;
}

/**
 * Reconstructs a document buffer by applying matches in reverse-topological order.
 */
export function reconstructContent(
  docLines: string[],
  matches: MatchResult[],
): string {
  const resultLines = [...docLines];

  // Sort descending by startLine to prevent index shifting during reconstruction
  const sortedMatches = [...matches].sort((a, b) => b.startLine - a.startLine);

  for (const match of sortedMatches) {
    const docBaseIndent = docLines[match.startLine].match(/^\s*/)?.[0] || '';
    const aiReplaceLines = match.replace.split('\n');
    const aiBaseIndent = aiReplaceLines[0].match(/^\s*/)?.[0] || '';

    const replaceLines = aiReplaceLines.map(line => {
      if (line.trim().length === 0) {
        return '';
      }
      // Strip AI's base indentation and apply the document's original indentation to maintain relative nesting
      const content = line.startsWith(aiBaseIndent)
        ? line.substring(aiBaseIndent.length)
        : line.trimStart();
      return docBaseIndent + content;
    });

    resultLines.splice(
      match.startLine,
      match.endLine - match.startLine + 1,
      ...replaceLines,
    );
  }

  return resultLines.join('\n');
}
