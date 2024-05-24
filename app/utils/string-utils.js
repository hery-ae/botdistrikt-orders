export default function stringUtils() {
  return true;
}

export function camelize(value) {
  let regexp = /(-|_|\.|\s)+(.)?/g;

  return value.replace(regexp, (_match, _separator, chr) =>
    chr ? chr.toUpperCase() : '',
  );
}

export function decamelize(value, to_char) {
  let regexp = /([a-z\d])([A-Z])/g;
  let to_chars = String('$1').concat(to_char).concat('$2');

  return value.replace(regexp, to_chars).toLowerCase();
}

export function underscore(value) {
  let regexp = /(\s|-|\.)+/g;

  return value.replace(regexp, '_');
}

export function dasherize(value) {
  let regexp = /(\s|_|\.)+/g;

  return value.replace(regexp, '-');
}
