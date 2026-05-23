import * as vscode from 'vscode';
import { AkkharSRViewProvider } from './providers/SurgicalViewProvider';
import { AkkharCodePreviewProvider } from './providers/DiffPreviewProvider';
import { registerExecutePatchCommand } from './commands/executePatch';
import { AkkharLogger } from './utils/logger';

/**
 * Entry point for the Akkhar Code Patcher extension.
 * Orchestrates the registration of providers and commands.
 */
export function activate(context: vscode.ExtensionContext) {
  const logger = AkkharLogger.getInstance();
  const previewProvider = new AkkharCodePreviewProvider();

  const provider = new AkkharSRViewProvider(
    context.extensionUri,
    logger.channel,
    previewProvider,
  );

  // Register the Virtual Document Provider for surgical diff previews
  context.subscriptions.push(
    vscode.workspace.registerTextDocumentContentProvider(
      'akkhar-code-patcher-preview',
      previewProvider,
    ),
  );

  // Register the Sidebar Webview View
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('akkhar-code-patcher-view', provider, {
      webviewOptions: { retainContextWhenHidden: true },
    }),
  );

  // Register implementation-agnostic commands
  registerExecutePatchCommand(context);
}

export function deactivate() {}