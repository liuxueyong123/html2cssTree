import {ParseHtml, getClassTreeFromAST} from '../core';

const getResult = (result: string) => {
  const result1 = result.substr(result.indexOf('.'));
  const result2 = result1.substr(0, result1.lastIndexOf('}') + 1);
  return result2.replace(/  /g, '');
};

describe('两个层级的测试', () => {
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

    expect(cssTree).toBe(getResult(`
      .parent {\r
      \t.child-1 {}\r
      \t.child-2 {}\r
      }
    `));
  });

  test('不带 class 的父元素', () => {
    const html = `
      <div>
        <div class="child-1"></div>
        <div class="child-2"></div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(getResult(`
      .child-1 {}\r
      .child-2 {}
    `));
  });

  test('拥有部分不带 class 的子元素', () => {
    const html = `
      <div class="parent">
        <div></div>
        <div class="child-2"></div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(getResult(`
      .parent {\r
      \t.child-2 {}\r
      }
    `));
  });

  test('只有一个子元素带 class', () => {
    const html = `
      <div>
        <div></div>
        <div class="child-2"></div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(getResult(`
      .child-2 {}
    `));
  });
});


describe('多个层级的测试', () => {
  test('多层级的父子元素', () => {
    const html = `
      <div class="parent">
        <div class="child-1">
          <div class="child-1-1">
            <div class="child-1-1-1"></div>
          </div>
          <div class="child-1-2"></div>
        </div>
        <div class="child-2">
          <div class="child-2-1"></div>
        </div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(getResult(`
      .parent {\r
      \t.child-1 {\r
      \t\t.child-1-1 {\r
      \t\t\t.child-1-1-1 {}\r
      \t\t}\r
      \t\t.child-1-2 {}\r
      \t}\r
      \t.child-2 {\r
      \t\t.child-2-1 {}\r
      \t}\r
      }
    `));
  });

  test('存在部分没有class的元素', () => {
    const html = `
      <div class="parent">
        <div>
          <div class="child-1-1">
            <div class="child-1-1-1"></div>
          </div>
          <div class="child-1-2"></div>
        </div>
        <div class="child-2">
          <div class="child-2-1"></div>
        </div>
      </div>
    `;

    const parseHtml = new ParseHtml(html);
    const astObj = parseHtml.parse();
    const cssTree = getClassTreeFromAST(astObj!);

    expect(cssTree).toBe(getResult(`
      .parent {\r
      \t.child-1-1 {\r
      \t\t.child-1-1-1 {}\r
      \t}\r
      \t.child-1-2 {}\r
      \t.child-2 {\r
      \t\t.child-2-1 {}\r
      \t}\r
      }
    `));
  });
});
