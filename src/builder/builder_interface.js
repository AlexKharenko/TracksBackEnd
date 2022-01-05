class BuilderIntrface {
  constructor() {
    if (!this.reset || !this.getResult || !this.setId) {
      throw new Error('Class must have items!');
    }
  }
}

module.exports = BuilderIntrface;
