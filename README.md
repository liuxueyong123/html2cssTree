中文 ｜ [English](https://github.com/liuxueyong123/html2cssTree/blob/master/README-english.md)

## html2csstree

[![Build Status](./assets/badges/badge-lines.svg.png)](./assets/badges/badge-lines.svg.png)
[![Build Status](./assets/badges/badge-branches.svg.png)](./assets/badges/badge-branches.svg.png)

一款 vscode 插件，用于对选中的 html 进行语法解析，将生成的 css class 树复制到剪贴板，省去手动写 css class 的困扰

## 下载

已经上架：[marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=liuxueyong123.html2csstree)

或者在 vscode 扩展中直接搜索 html2csstree 安装即可

## 快捷键

mac: `command + 2`

windows: `ctrl + 2`

如有冲突，用户可自定义快捷键

## 功能

选中需要解析的一段 html 后，按下快捷键（或右键菜单选择html2css）即可将生成的 css tree 复制到剪贴板以供使用

例：

``` html
<div class="parent">
  <div class="child-1">
    <div class="child-child-1"></div>
    <div class="child-child-2"></div>
  </div>
  <div class="child-2"></div>
</div>
```

结果：

``` css
.parent {
  .child-1 {
    .child-child-1 {}
    .child-child-2 {}
  }
  .child-2 {}
}
```

## License

MIT © Richard McRichface

## TODO List

- 全局错误处理 ✅
- 测试用例补充
- CHANGELOG 补充 ✅
- readme 中英文切换 ✅
- readme 录制 usage 视频
- 支持右键菜单转换 css ✅
- [部分情况下存在解析错误](https://github.com/liuxueyong123/html2cssTree/issues/3)
- [解析 html 为 AST 过程研究优化](https://github.com/liuxueyong123/html2cssTree/issues/1)
