# html2csstree

一款 vscode 插件，用于对选中的 html 进行语法解析，将生成的 css class 树复制到剪贴板，省去手动写css class的困扰

# 下载

已经上架：marketplace.visualstudio.com

或者在vscode扩展中直接搜索 html2csstree 安装即可

# 快捷键

mac: `command + 2`

windows: `ctrl + 2`

如有冲突，用户可自定义快捷键

# 功能

选中需要解析的一段 html，按下快捷键即可将生成的 css tree 复制到剪贴板

例：

```
<div class="parent">
  <div class="child-1">
    <div class="child-child-1"></div>
    <div class="child-child-2"></div>
  </div>
  <div class="child-2"></div>
</div>
```

转换后结果：

```
  .parent {.child-1 {.child-child-1 {}.child-child-2 {}}.child-2 {}}
```
