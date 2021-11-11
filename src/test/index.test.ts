import {ParseHtml, getClassTreeFromAST} from '../core';

describe('测试解析是否正常', () => {
  test('最简单的父子元素', () => {
    const html = `
      <div class="parent">
        <div class="child-1"></div>
        <div class="child-2"></div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(`.parent {\r\n\t.child-1 {}\r\n\t.child-2 {}\r\n}`);
  });
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