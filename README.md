# Akkhar Code Patcher (Surgical Search & Replace)

### Akkhar Orchestration Protocol V2

A high-integrity delivery mechanism for AI-generated code patches. Akkhar Code
Patcher provides a surgical approach to code modification, ensuring context
retention and atomic execution.

## Features

- **Bulk Preview Diff**: Review multiple patches simultaneously using the native
  VS Code side-by-side diff engine.
- **Reverse-Topological Execution**: Patches are applied from the bottom of the
  file to the top to maintain line-number integrity and prevent offset drift.
- **Surgical Precision Engine**: Uses a line-by-line sliding window algorithm to
  ensure bit-perfect matches while remaining immune to CRLF/LF (Windows/Unix)
  line-ending conflicts.
- **Atomic Transactions**: All patches in a stream are committed as a single
  undo-able event using `vscode.workspace.applyEdit`.
- **Diagnostic Feedback**: Real-time validation and error logging to a dedicated
  Output Channel for debugging complex patch streams.

## Usage

1. Open the **Akkhar Orchestration** sidebar icon.
2. Paste your patch stream into the buffer. The stream must follow the Akkhar
   DSL:
   ```text
   File Path: /path/to/file
   <<<<<<< SEARCH [Index]
   Original Code
   =======
   Replacement Code
   >>>>>>> REPLACE [Index]
   ```
3. Click **Preview Bulk Diff** to verify the changes.
4. Click **Execute Patch** to commit the changes surgically.

## Requirements

- VS Code v1.80.0+
- Akkhar-Labs Orchestration Protocol V2 compatible AI generator.

---

© 2026 Akkhar-Labs. Principal Architect: Rahat Hasan.
