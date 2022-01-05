class Handler {
  setNextHandler(handler) {
    this.handler = handler;
  }

  async handle(req) {
    if (this.handler) {
      try {
        return await this.handler.handle(req);
      } catch (err) {
        return { err };
      }
    }
  }
}

module.exports = Handler;
