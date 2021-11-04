import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

import { ParseHtml, getClassTreeFromAST } from '../../core';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));

		const html = `
			<div class="parent">
				<div class="child-1">
					<div class="child-1-1">
						<img />
						<div class111="child-1-1-2"></div>
					</div>
					<span class="child-1-2">22</span>
				</div>
				<img src="" class="img" />
				<span class="child-2">123</span>
			</div>
		`;

		const parseHtml = new ParseHtml(html);
		const astObj = parseHtml.parse();

		if(astObj) {
			console.log('astObj', astObj);
			console.log(getClassTreeFromAST(astObj, 1));
		}
	});
});
