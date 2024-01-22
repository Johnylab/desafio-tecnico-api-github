class JSONLocalStorage<T> {
  private prefix: string;
  private prefixRegExp: RegExp;
  private defaultValue: T | null;

  constructor(prefix: string, defaultValue: T | null = null) {
    this.prefix = prefix;
    this.prefixRegExp = new RegExp(`^${this.prefix}:`);
    this.defaultValue = defaultValue;
  }

  get(key: string): T | null {
    const value = localStorage.getItem(`${this.prefix}:${key}`);

    try {
      return value ? JSON.parse(value) : this.defaultValue;
    } catch (e) {
      return this.defaultValue;
    }
  }

  set(key: string, value: T): void {
    localStorage.setItem(`${this.prefix}:${key}`, JSON.stringify(value));
  }

  getAllItems(): T[] {
    const items: T[] = [];

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        const value = this.get(key.replace(this.prefixRegExp, ''));

        if (value) {
          items.push(value);
        }
      }
    });

    return items;
  }

  clear(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

export default JSONLocalStorage;
