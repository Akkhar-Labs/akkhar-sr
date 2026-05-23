# Changelog

All notable changes to the **Akkhar Code Patcher (Surgical Search & Replace)**
extension will be documented in this file. This project adheres to
[Semantic Versioning](https://semver.org/) and follows the
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format.

## [0.0.1] - 2026-05-23

### Initial Public Release

- **Akkhar Orchestration Protocol V4 Engine**: Implemented a professional-grade
  structural matching algorithm that ignores indentation mismatches, ensuring
  100% reliability against AI-generated spacing hallucinations.
- **Intelligent Re-indentation**: Automatic detection and application of
  document-level indentation to all replacement blocks.
- **Bulk Preview Diff**: Seamless integration with the native VS Code
  side-by-side diff engine to review multi-block surgical patches before they
  touch the disk.
- **Decoupled Architecture**: Service-oriented codebase structure following Meta
  and Microsoft open-source standards for high maintainability and testability.
- **Atomic Transactions**: Integration with `vscode.workspace.applyEdit` to
  ensure all patches in a stream are committed as a single, undo-able event.
- **Reverse-Topological Execution**: Patches are applied from the bottom of the
  file to the top to maintain line-number integrity and prevent offset drift.
- **UI Persistence**: Implementation of `retainContextWhenHidden` to ensure the
  sidebar input buffer remains persistent across tab switches.
- **Language-Aware Highlighting**: Dynamic URI scheme injection to trigger
  native syntax coloring for any supported language within the diff preview.
- **Surgical Diagnostics**: Centralized logging via a dedicated "Akkhar Code
  Patcher Debug" Output Channel for real-time validation feedback.

---

_© 2026 Akkhar-Labs. Architected by rahathasan._
