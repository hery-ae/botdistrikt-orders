import { helper } from '@ember/component/helper';

export default helper(function thousandsSeparator(positional /*, named*/) {
  if (Number(positional[0])) {
    return Number(positional[0]).toLocaleString();
  }

  return positional;
});
