import postcssPrefixSelector from 'postcss-prefix-selector';

export default {
  plugins: [
    postcssPrefixSelector({
      prefix: '.dashboard-mfe',
      exclude: ['html', 'body', '*:where(:not(html, body, .dashboard-mfe *))'],
      transform(prefix, selector, prefixedSelector) {
        if (selector === 'html' || selector === 'body') {
          return selector;
        }
        return prefixedSelector;
      },
    }),
  ],
};