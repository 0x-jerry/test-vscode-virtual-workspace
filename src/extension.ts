'use strict';

import * as vscode from 'vscode';
import { MemFS } from './fileSystemProvider';

export function activate(context: vscode.ExtensionContext) {

    console.log('MemFS says "Hello"');

    const memFs = new MemFS();
    const uri = vscode.workspace.workspaceFolders?.[0].uri

    if (uri?.scheme === 'memfs') {
        memFs.createDirectory(uri)

        vscode.window.showInformationMessage(uri.toString())
    }

    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('memfs', memFs, { isCaseSensitive: true }));

    context.subscriptions.push(vscode.commands.registerCommand('memfs.workspaceInit', _ => {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse('memfs:/root'));
    }));

    context.subscriptions.push(vscode.commands.registerCommand('memfs.workspaceInitWithFragment', _ => {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse('memfs:/root#hello'));
    }));

    context.subscriptions.push(vscode.commands.registerCommand('memfs.workspaceInitWithQuery', _ => {
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse('memfs:/root?a=b'));
    }));
}

