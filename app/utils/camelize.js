export default function camelize(str) {
  const regExp = new RegExp('-[a-z]', 'g');

  return str.replace(regExp, (match) => match.charAt(1).toUpperCase());
}

export function decamelize(str) {
  const regExp = new RegExp('[A-Z]', 'g');

  return str.replaceAll(regExp, (match) =>
    String('-').concat(match.toLowerCase()),
  );
}
