// https://github.com/i18next/react-i18next/blob/master/example/test-jest/__mocks__/react-i18next.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require('react');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const reactI18next = require('react-i18next');

const hasChildren = (node) =>
  node && (node.children || (node.props && node.props.children));

const getChildren = (node) =>
  node && node.children ? node.children : node.props && node.props.children;

const renderNodes = (reactNodes) => {
  if (typeof reactNodes === 'string') {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === 'string') {
      return child;
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child));
      // eslint-disable-next-line react/no-array-index-key
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce(
        (str, childKey) => `${str}${child[childKey]}`
      );
    }

    return child;
  });
};

// Mock t function
// supports t('key') and t(['key', 'fallbackKey'])
const t = (k) => (Array.isArray(k) ? k[0] : k);
const useMock = [t, {}];
useMock.t = t;
useMock.i18n = {};

module.exports = {
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => (Component) => {
    // eslint-disable-next-line no-param-reassign
    Component.defaultProps = { ...Component.defaultProps, t };
    return Component;
  },
  Trans: ({ children }) => renderNodes(children),
  Translation: ({ children }) => children((k) => k, { i18n: {} }),
  useTranslation: () => useMock,

  // mock if needed
  I18nextProvider: reactI18next.I18nextProvider,
  initReactI18next: reactI18next.initReactI18next,
  setDefaults: reactI18next.setDefaults,
  getDefaults: reactI18next.getDefaults,
  setI18n: reactI18next.setI18n,
  getI18n: reactI18next.getI18n,
};