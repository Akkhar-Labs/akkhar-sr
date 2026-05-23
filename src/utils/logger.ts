import * as vscode from 'vscode';

/**
 * Singleton Logger Utility for Akkhar Code Patcher.
 * Encapsulates the VS Code OutputChannel for centralized diagnostic logging.
 */
export class AkkharLogger {
  private static _instance: AkkharLogger;
  private _outputChannel: vscode.OutputChannel;

  private constructor() {
    this._outputChannel = vscode.window.createOutputChannel(
      'Akkhar Code Patcher Debug',
    );
  }

  public static getInstance(): AkkharLogger {
    if (!AkkharLogger._instance) {
      AkkharLogger._instance = new AkkharLogger();
    }
    return AkkharLogger._instance;
  }

  public appendLine(message: string) {
    this._outputChannel.appendLine(
      `[${new Date().toLocaleTimeString()}] ${message}`,
    );
  }

  public show() {
    this._outputChannel.show(true);
  }

  public get channel(): vscode.OutputChannel {
    return this._outputChannel;
  }
}
