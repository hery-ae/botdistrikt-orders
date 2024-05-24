import { helper } from '@ember/component/helper';

export default helper(function calculate(positional, named) {
  switch (named.operator) {
    case '+':
      return positional.reduce((result, n) => {
        return (result += Number(n));
      }, 0);

    case '-':
      return positional.reduce((result, n) => {
        return (result -= Number(n));
      }, 0);

    case '*':
      return positional.reduce((result, n, i) => {
        if (i < 1) {
          return (result = Number(n));
        }

        return (result = result * Number(n));
      }, undefined);

    case '/':
      return positional.reduce((result, n, i) => {
        if (i < 1) {
          return (result = Number(n));
        }

        return (result = result / Number(n));
      }, undefined);

    default:
      return positional.join('');
  }
});
