import * as vscode from 'vscode';
import { ParseHtml, getClassTreeFromAST } from './core';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('html2csstree.html2css', () => {
		const editor = vscode.window.activeTextEditor;
		if(!editor) {return;}
		const allSelections = editor.selections;

		allSelections.forEach(selection => {
			const text = editor.document.getText(selection);
			const parseHtml = new ParseHtml(text);
			const astObj = parseHtml.parse();
			if(!astObj) {
				vscode.window.showErrorMessage('未识别到完整html');
				return;
			}

			const cssTree = getClassTreeFromAST(astObj);
			vscode.window.showInformationMessage(JSON.stringify(astObj));
			vscode.window.showInformationMessage(cssTree);
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}