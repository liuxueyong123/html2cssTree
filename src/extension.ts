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
	
			try {
				const astObj = parseHtml.parse();

				if(!astObj) {
					vscode.window.showErrorMessage("Can't find HTML");
					return;
				}
	
				const cssTree = getClassTreeFromAST(astObj);
				await vscode.env.clipboard.writeText(cssTree);
				vscode.window.showInformationMessage('CSS tree copied successfully');
			} catch(e: any) {
				vscode.window.showErrorMessage(e.message);
				return;
			}

		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}