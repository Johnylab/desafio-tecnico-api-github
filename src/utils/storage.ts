function getStorage<T>(key: string, defaultValue: T): T {
  const value = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return defaultValue;
}

function setStorage(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getStorage, setStorage };
