function searchByKeys<T>(items: T[], keys: (keyof T)[], value: string): T[] {
  return items.filter((item) => {
    const itemValues = keys.map((key) => `${item[key]}`.toLowerCase());
    return itemValues.some((itemValue) => itemValue.includes(value));
  });
}

function sortByKey<T>(items: T[], key: keyof T, asc = true): T[] {
  return items.sort((a, b) => {
    if (a[key] === b[key]) {
      return 0;
    }

    if (asc) {
      return a[key] > b[key] ? 1 : -1;
    }

    return a[key] < b[key] ? 1 : -1;
  });
}

export { searchByKeys, sortByKey };
