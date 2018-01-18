import compiler from './compiler.js';

test('Demo code should inject to markdown file', async () => {
  const replacePipeWith = '---+++++---';
  const stats = await compiler('./fixture/doc.md', {
    replacePipeWith,
  });
  const output = stats.toJson().modules[0].source;

  expect(output.indexOf('| 属性  | 描述  | 类型 | 默认值 |') > -1).toBe(true);
  expect(output.indexOf(replacePipeWith) > -1).toBe(true);
});

/*
test('Demo code should inject to markdown file', async () => {
  const stats = await compiler('./fixture/doc.md');
  const output = stats.toJson().modules[0].source;

  expect(output).toBe('module.exports = \"# Some doc\\n\\n## Hello\\n\\n## Example\\n\\n```jsx\\nclass HelloMessage extends React.Component {\\n  render() {\\n    return (\\n      <div>\\n        Hello {this.props.name}\\n      </div>\\n    );\\n  }\\n}\\n\\nReactDOM.render(\\n  <HelloMessage name=\\\"Taylor\\\" />,\\n  mountNode\\n);\\n\\n```\\n\"');
});

test('Test custom pattern', async () => {
  const pattern = 'SHOULD_REPLACED_BY_CUSTOM_PATTERN{(./customPattern.txt)}\n';
  const stats = await compiler('./fixture/doc2.md', {
    pattern,
  });
  const output = stats.toJson().modules[0].source;

  console.log(output);

  expect(output.indexOf(pattern)).toBe(-1);
  expect(output.indexOf('HELLO_WORLD') > -1).toBe(true);
});*/
