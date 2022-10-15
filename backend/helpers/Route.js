class Route {
  constructor(app) {
    this.app = app;
  }

  withInterceptor(interceptor) {
    this.interceptor = interceptor;
    return this;
  }

  withoutInterceptor() {
    this.interceptor = null;
    return this;
  }

  register(path, routeFile) {
    if (this.interceptor) {
      this.app.use(path, this.interceptor, routeFile);
    }
    this.app.use(path, routeFile);
    return this;
  }
}

module.exports = Route;
