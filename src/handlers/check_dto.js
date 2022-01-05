const Handler = require('./handle');
const DTO = require('../data_types/index');
const { Error400 } = require('../errors/index');

class CheckDTOMatchHandler extends Handler {
  constructor(dto_name) {
    super();
    this.dto = DTO[dto_name];
  }

  async handle(table) {
    const DTOkeys = Object.keys(this.dto);
    let correct = true;
    let key = '';
    DTOkeys.forEach((item) => {
      // eslint-disable-next-line valid-typeof
      if (this.dto[item] !== typeof table[item]) {
        correct = false;
        key = item;
      }
    });
    if (!correct) {
      throw new Error400(`Not match DTO, field ${key} `);
    }
    return super.handle(table);
  }
}

module.exports = CheckDTOMatchHandler;
