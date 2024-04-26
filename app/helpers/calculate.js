import { helper } from '@ember/component/helper';

export default helper(function calculate(positional /*, named*/) {
  switch (String(positional[2])) {
    case '+':
      return Number(positional[0]) + Number(positional[1]);

    case '-':
      return Number(positional[0]) - Number(positional[1]);

    case '*':
      return Number(positional[0]) * Number(positional[1]);

    case '/':
      return Number(positional[0]) / Number(positional[1]);

    default:
      return null;
  }
});
