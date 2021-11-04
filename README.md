## html2csstree

一款 vscode 插件，用于对选中的 html 进行语法解析，将生成的 css class 树复制到剪贴板，省去手动写 css class 的困扰

## 下载

已经上架：marketplace.visualstudio.com

或者在 vscode 扩展中直接搜索 html2csstree 安装即可

## 快捷键

mac: `command + 2`

windows: `ctrl + 2`

如有冲突，用户可自定义快捷键

## 功能

选中需要解析的一段 html 后，按下快捷键即可将生成的 css tree 复制到剪贴板以供使用

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

结果：

```
  .parent {.child-1 {.child-child-1 {}.child-child-2 {}}.child-2 {}}
```

# English

# html2csstree

A vscode plug-in for parsing the selected HTML and copying the generated CSS class tree to the clipboard, eliminating the trouble of writing CSS classes manually

## Download

Already on the shelves: marketplace.visualstudio.com

Or you can directly search the vscode extension for html2csstree installation

## Shortcut key

mac: `command + 2`

windows: `ctrl + 2`

In case of conflict, users can customize shortcut keys

## Function

After selecting a section of HTML to be parsed, press the shortcut key to copy the generated CSS tree to the clipboard for use

Example:

```
<div class="parent">
  <div class="child-1">
    <div class="child-child-1"></div>
    <div class="child-child-2"></div>
  </div>
  <div class="child-2"></div>
</div>
```

Result：

```
  .parent {.child-1 {.child-child-1 {}.child-child-2 {}}.child-2 {}}
```
