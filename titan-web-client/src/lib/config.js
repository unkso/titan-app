class Config {
  constructor () {
    this.config = {};
  }

  load (config) {
    this.config = config;
  }

  get (path = '') {
    if (path === '') {
      return this.config;
    }

    const parts = path.split('.');
    let value = this.config;

    for (const part of parts) {
      if (!value[part]) {
        return null;
      }

      value = value[part];
    }

    return value;
  }
}

export default Config;
