# React Docgen Markdown Injection Loader

A loader for webpack that lets you parse docs from React source and inject to to file.

## Install

```bash
npm install --save-dev react-docgen-markdown-injection-loader raw-loader
```

## Usage

Use the loader either via your webpack config, CLI or inline.

**Note**: the loader just INJECTION ([guidelines](https://webpack.js.org/contribute/writing-a-loader/#guidelines)), you can use it with `raw-loader` to require non-js file.

`webpack.config.js`:

```javascript
module.exports = {
  module: {
    rules: [{
      test: /\.md$/,
      use: [
        {
          loader: 'raw-loader',
        },
        {
          loader: 'react-docgen-markdown-injection-loader',
          options: {
            // default pattern
            pattern: /__REACT_DOCGEN_MD\('(.+)'\)/,
          },
        }
      ]
    }]
  }
}
```

In your application

```javascript
import md from 'some.md';
```

`some.md`:

```
# Title

## SomeComponent

- list 1
- list 1

### Props

__REACT_DOCGEN_MD('../src/SomeComponent.jsx')
```

**Note**: `__REACT_DOCGEN_MD` path (`../src/SomeComponent.jsx`) should RELATIVE to `some.md`.
