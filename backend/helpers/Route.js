class Route {
  constructor(app) {
    this.app = app;
  }

  withInterceptor(interceptor) {
    this.interceptor = interceptor;
    return this;
  }

  register(path, routeFile) {
    this.app.use(path, this.interceptor, routeFile);
    return this;
  }
}

module.exports = Route;
