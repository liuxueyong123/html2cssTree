import {ParseHtml, getClassTreeFromAST} from '../core';

test('adds 1 + 2 to equal 3', () => {
  expect(3).toBe(3);
});


test('import', () => {
  const html = `
    <div>
      <div class="parent">
        <div class="child-1"></div>
        <div class="child-2"></div>
      </div>
      <div class="parent2">
        <div class="child-3"></div>
        <div class="child-4"></div>
      </div>
    </div>
  `;
  const parseHtml = new ParseHtml(html);
  const astObj = parseHtml.parse();
  const cssTree = getClassTreeFromAST(astObj!);

  console.log('cssTree', cssTree);
});