const INIT = 'init';                        // 初始状态
const TAG_START = 'tagStart';               // 解析开始标签
const ATTRIBUTE_START = 'attributeStart';   // 开始解析属性
const ATTRIBUTE_VALUE = 'attributeValue';   // 解析属性值
const ATTRIBUTE_END = 'attributeEnd';       // 解析一个属性结束
const TAG_END = 'tagEnd';                   // 解析开始标签结束
const OPEN_TAG = 'openTag';                 // 打开了一个标签
const CLOSE_TAG = 'closeTag';               // 解析完成一个标签，关闭
const CLOSE_TAG_START = 'closeTagStart';    // 开始解析结束标签
const CLOSE_TAG_END = 'closeTagEnd';        // 解析结束标签结束

const regMap: any = {
  isLetter: /[a-zA-Z]/,
  isEmpty: /[\s\n]/,
};

const $reg: any = {};
Object.keys(regMap).forEach(key => {
  const reg = regMap[key];
  $reg[key] = (s: string) => reg.test(s);
});

interface NodeAST {
  tag: string;
  attribute: Record<string, string>;
  text: string;
  children: NodeAST[];
}

/**
 * 节点类
 * @class
*/
class Node implements NodeAST {
  tag: string;
  attribute: Record<string, string>;
  text: string;
  children: Node[];
  
  constructor(tag: string) {
    // tag的名称
    this.tag = tag;
    // 属性
    this.attribute = {};
    // 节点对应的文本，这里值针对叶子节点
    this.text = '';
    // 节点的子节点
    this.children = [];
  }
}

/**
 * 解析 html 模版
 */
export class ParseHtml {
  html: string;
  // 状态
  status: string = INIT;
  // 索引
  index: number = 0;
  // 栈
  tagStack: any[] = [];
  // 文本
  text: string = '';
  // 当前标签名
  tagName: string = '';
  // 正则
  $reg: any = $reg;
  // 输出的根节点
  node: NodeAST | null = null;
  // 当前节点
  currentNode: any = null;
  // 属性名
  attributeName: string = '';
  // 属性值
  attributeValue: string = '';
  parentNode: any;

  constructor(html: string) {
    this.html = html;
  }

  // 预处理
  preHandle() {
    this.html = this.html.replace(/\n[ ]+/g, ' ');
    this.html = this.html.replace(/\n/g, '');
    this.html = this.html.replace(/[ ]+/g, ' ');
    this.html = this.html.replace(/<[\s]+/g, '<');
    this.html = this.html.replace(/[\s]+>/g, '>');
    this.html = this.html.replace(/[\s]+\/>/g, '/>');
    this.html = this.html.replace(/[\s]*=[\s]*"/g, '="');
    console.log(this.html);
  }

  // 解析主流程
  parse() {
    this.preHandle();
    for (this.index = 0; this.index < this.html.length; this.index ++) {
      const s = this.html[this.index];
      const pre = this.html[this.index - 1];
      const next = this.html[this.index + 1];
      // console.log(s, next, this.status);
      switch(this.status) {
        case INIT:
          this.parseInit(s);
          break;
        case TAG_START:
          this.parseTagStart(s, pre, next);
          break;
        case ATTRIBUTE_START:
          this.parseAttributeStart(s, pre, next);
          break;
        case ATTRIBUTE_VALUE:
          this.parseAttributeValue(s, pre, next);
          break;
        case ATTRIBUTE_END:
          this.parseAttributeEnd(s, pre, next);
          break;
        case TAG_END:
          this.parseTagEnd(s, pre, next);
          break;
        case OPEN_TAG:
          this.parseOpenTag(s, pre, next);
          break;
        case CLOSE_TAG_START:
          this.parseCloseTagStart(s, pre, next);
          break;
        case CLOSE_TAG_END:
          this.parseCloseTagEnd(s, pre, next);
          break;
        default: 
          break;
      }
    }
    return this.node;
  }

  // 解析初始状态
  parseInit(s: string) {
    if (s === '<') {
      this.status = TAG_START;
    }
  }

  // 解析开始标签
  parseTagStart(s: string, pre: string, next: string) {
    const handle = () => {
      if (!this.node) {
        this.node = new Node(this.tagName);
        this.currentNode = this.node;
        this.parentNode = null;
      } else {
        this.parentNode = this.currentNode;
        this.currentNode = new Node(this.tagName);
        this.parentNode.children.push(this.currentNode);
      }
      this.tagStack.push(this.currentNode);
    };

    if (this.$reg.isLetter(s)) {
      // 标签名
      this.tagName += s;
    } else if (this.$reg.isEmpty(s) && this.$reg.isLetter(next)) {
      // 解析属性
      handle();
      this.status = ATTRIBUTE_START;
    } 
    if (next === '>') {
      // 开始标签结尾
      handle();
      this.status = TAG_END;
    } 
  }

  // 开始解析属性
  parseAttributeStart(s: string, pre: string, next: string) {
    // if (this.$reg.isLetter(s)) {
    if (s !== '=') {
      this.attributeName += s;
    }
    if (next === ' ' || next === '>' || (next === '/' && this.html[this.index + 2] === '>')) {
      this.currentNode.attribute[this.attributeName] = this.attributeValue;
      this.attributeName = '';
      this.attributeValue = '';
    }
    if (next === ' ') {
      this.status = ATTRIBUTE_END;
    } else if (next === '>' || next === '' || (next === '/' && this.html[this.index + 2] === '>')) {
      this.status = TAG_END;
    } else if (next === '"') {
      this.status = ATTRIBUTE_VALUE;
    }
  }

  // 解析属性值开始
  parseAttributeValue(s: string, pre: string, next: string) {
    if (s !== '"') {
      this.attributeValue += s;
    }
    if(next === '"') {
      this.currentNode.attribute[this.attributeName] = this.attributeValue;
      this.attributeName = '';
      this.attributeValue = '';
      this.status = ATTRIBUTE_END;
    }
  }

  // 解析属性结束
  parseAttributeEnd(s: string, pre: string, next: string) {
    if (this.$reg.isEmpty(s)) {
      this.status = ATTRIBUTE_START;
    }
    if(next === '>') {
      this.status = TAG_END;
    }
  }

  // 解析开始标签结束
  parseTagEnd(s: string, pre: string, next: string) {
    if (pre === '/' && s === '>') {
      // 自闭合标签
      this.status = CLOSE_TAG_END;
      this.index--;// 回退一步，使关闭标签的索引落在>上以便正常解析
      return;
    }
    if (s === '>') {
      this.tagName = '';
      this.status = OPEN_TAG;
    }
  }

  // 打开了一个标签
  parseOpenTag(s: string, pre: string, next: string) {
    if (s === '<') {
      if (next === '/') {
        this.status = CLOSE_TAG_START;
      } else {
        this.status = TAG_START;
      }
    } else {
      this.currentNode.text += s;
    }
  }

  // 解析完成一个标签，关闭
  parseCloseTagStart(s: string, pre: string, next: string) {
    if (this.$reg.isLetter(s)) {
      // if (s !== '>' && s !== '/') {
      this.tagName += s;
    } else if(this.$reg.isEmpty(s)) {
      throw new Error('解析闭合标签失败: ' + this.tagName);
    }

    if (next === '>') {
      this.status = CLOSE_TAG_END;
    }
  }

  // 解析结束标签结束
  parseCloseTagEnd(s: string, pre: string, next: string) {
    if (s === '>') {
      const stackTop = this.getTagStackTop();
      if (stackTop.tag === this.tagName) {
        // this.currentNode = stackTop;
        deleteEmptyProp(stackTop);
        this.tagStack.pop();
        this.currentNode = this.getTagStackTop();
        this.tagName = '';
        this.status = OPEN_TAG;
      } else {
        throw new Error('标签不能闭合: ' + this.tagName);
      }
    }

    // 删除空属性
    function deleteEmptyProp(node: any) {
      if (!node.text) {
        delete node.text;
      }
      if (node.children.length === 0) {
        delete node.children;
      }
      if (Object.keys(node.attribute).length === 0) {
        delete node.attribute;
      }
    }
  }

  // 获取栈顶
  getTagStackTop() {
    return this.tagStack[this.tagStack.length - 1];
  }
}

const assertClassExist = (astObj: NodeAST) => {
  if(astObj.attribute && astObj.attribute.class) {
   return true;
  }

  return false;
};

export const getClassTreeFromAST = (astObj: NodeAST, currentLevel = 1) => {
  let result = '';
  if(assertClassExist(astObj)) {
    result += `.${astObj.attribute.class} {`;
  }

  let haveChildClass = false;
  if(astObj.children) {
    for(const child of astObj.children) {
      if(!assertClassExist(child)) {continue;}
      haveChildClass = true;
      result += `\r\n${'\t'.repeat(currentLevel)}`;
      result += getClassTreeFromAST(child, currentLevel + 1);
    }
  }

  if(astObj.attribute && astObj.attribute.class) {
    result += `${haveChildClass ? `\r\n${'\t'.repeat(currentLevel - 1)}` : ''}}`;
  }

  return result;
};

const html = `
  <my-button class="parent">
    <div class="child-1">
      <div class="child-1-1">
        <img />
        <div class111="child-1-1-2"></div>
      </div>
      <span class="child-1-2">22</span>
    </div>
    <img src="" class="img" />
    <span class="child-2">123</span>
  </my-button>
`;

const html2 = `
<div class="edit-text-card" v-show="isEditText">
  <van-uploader
    class="img-upload"
    v-model="uploadImgListRef"
  ></van-uploader>
</div>
`;

const parseHtml = new ParseHtml(html2);
const astObj = parseHtml.parse();

if(astObj) {
  console.log('astObj', astObj);
  console.log(getClassTreeFromAST(astObj, 1));
}
