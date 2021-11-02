import * as vscode from 'vscode';
import { ParseHtml, getClassTreeFromAST } from './core';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('html2csstree.html2css', async () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {return;}
		const allSelections = editor.selections;

		allSelections.forEach(async selection => {
			const text = editor.document.getText(selection);
			const parseHtml = new ParseHtml(text);
			const astObj = parseHtml.parse();

			if(!astObj) {
				vscode.window.showErrorMessage('Full HTML not recognized');
				return;
			}

			const cssTree = getClassTreeFromAST(astObj);
			await vscode.env.clipboard.writeText(cssTree);
			vscode.window.showInformationMessage('CSS tree copied successfully');
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}