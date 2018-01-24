// TODO: 表格中 \| 仍然被当做单元格分隔符处理问题

export default class MarkdownGenerator {
  constructor(options) {
    this.options = options;
  }

  // 属性类型
  generatePropType(type) {
    let values = '';
    const delimiter = this.options.replacePipeWith || '|';

    if (Array.isArray(type.value)) {
      if (type.name === 'enum') {
        values = type.value.map(function(typeValue) {
          return `\`${typeValue.value}\``;
        }).join(', ');
        values = `Enum { ${values}} `;
      } else {
        values = type.value.map(function(typeValue) {
          return `\`${typeValue.name || typeValue.raw}\``;
        }).join(delimiter);
      }
    } else {
      values = `\`${type.name}\``;
    }

    return values;
  }

  // 默认值
  generatePropDefaultValue(value) {
    if (!value) {
      return '-';
    }

    const { replacePipeWith } = this.options;

    let returnValue = value.value.replace(/\n/g, '\\n');

    if (typeof replacePipeWith === 'string') {
      // escape `|` in markdown table
      returnValue = returnValue.replace(/\|/g, replacePipeWith);
    }

    return `\`${returnValue}\``;
  }

  generateProp(propName, prop) {
    const type = prop.type ? this.generatePropType(prop.type) : ' ';
    const defaultValue = this.generatePropDefaultValue(prop.defaultValue);

    return `| ${propName} | ${prop.description} | ${type} | ${defaultValue} |`;
  }

  generateProps(props) {
    const propsMd = [];

    Object.keys(props)
      .sort()
      .forEach(propName => {
        const desc = props[propName].description;
        // 忽略 @ignore
        if (desc && desc.indexOf('@ignore') > -1) {
          return;
        }

        propsMd.push(this.generateProp(propName, props[propName]));
      });

    return propsMd.join('\n');
  }

  generateMarkdown(reactAPI) {
    const tpl = `| 属性  | 描述  | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |`;

    return `${tpl}\n${this.generateProps(reactAPI.props)}`;
  }
}

MarkdownGenerator.DEFAULTS = {
};
