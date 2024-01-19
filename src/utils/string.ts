function pluralize(count: number, word: string, plural: string = word + 's') {
  return count === 1 ? word : plural;
}

function curriedPlural(count: number) {
  return function (word: string, plural: string = word + 's') {
    return pluralize(count, word, plural);
  };
}

export { curriedPlural, pluralize };
