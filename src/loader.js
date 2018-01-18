import path from 'path';
import fs from 'fs';
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import { parse as reactDocParse } from 'react-docgen';
import MarkdownGenerator from './MarkdownGenerator';

const LOADER_NAME = 'React-docgen Markdown Injection Loader';
const schema = {
  type: 'object',
  properties: {
    pattern: {
      anyOf: [
        { type: 'string' },
        { 'instanceof': 'RegExp' }
      ]
    },
    replacePipeWith: {
      type: 'string',
    }
  },
  "additionalProperties": false
};

const DEFAULT_OPTIONS = {
  pattern: /__REACT_DOCGEN_MD\('(.+)'\)/,
  replacePipeWith: null,
};

export default function injectionLoader(source) {
  let options = getOptions(this) || {};

  validateOptions(schema, options, LOADER_NAME);

  options = Object.assign({}, DEFAULT_OPTIONS, options);

  const { pattern, replacePipeWith } = options;

  const regexString = pattern instanceof RegExp ? pattern.source : pattern;
  const regexWithoutFlag = new RegExp(regexString);
  const matches = source.match(new RegExp(regexString, 'mg'));
  const resourceDir = path.parse(this.resourcePath).dir;

  if (!matches) {
    return this.callback(null, source);
  }

  const mdGenerator = new MarkdownGenerator({ replacePipeWith });

  matches.forEach((item) => {
    const matchPath = regexWithoutFlag.exec(item);

    if (matchPath && matchPath[1]) {
      const filePath = path.resolve(resourceDir, matchPath[1]);

      if (fs.existsSync(filePath)) {
        this.addDependency(filePath);
        const src = fs.readFileSync(filePath, 'utf8');
        const docData = reactDocParse(src);
        const md = mdGenerator.generateMarkdown(docData);

        source = source.replace(item, md);
      }
    }
  });

  this.callback(null, source);
}
