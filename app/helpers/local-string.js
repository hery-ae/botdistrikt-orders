import { helper } from '@ember/component/helper';

export default helper(function localString(str) {
  if (Number(str)) {
    return Number(str).toLocaleString();
  }

  return str;
});
