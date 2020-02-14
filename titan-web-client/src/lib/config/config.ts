type ConfigValue = number|string|{};

export class Config {
  constructor (private config = {}) {
  }

  get (path = ''): ConfigValue|undefined {
    if (path === '') {
      return this.config;
    }

    const parts = path.split('.');
    let value = this.config;

    for (const part of parts) {
      if (!value[part]) {
        return undefined;
      }

      value = value[part];
    }

    return value;
  }
}
