[中文](https://github.com/liuxueyong123/html2cssTree) ｜ English

# html2csstree

[![Build Status](./assets/badges/badge-lines.svg)](./assets/badges/badge-lines.svg)
[![Build Status](./assets/badges/badge-branches.svg)](./assets/badges/badge-branches.svg)

A vscode plug-in for parsing the selected HTML and copying the generated CSS class tree to the clipboard, eliminating the trouble of writing CSS classes manually

## Install

Already on the shelves: [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=liuxueyong123.html2csstree)

Or you can directly search the vscode extension for html2csstree installation

## Shortcut key

mac: `command + 2`

windows: `ctrl + 2`

In case of conflict, users can customize shortcut keys

## Usage

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
