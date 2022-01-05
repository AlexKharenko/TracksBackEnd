const Handler = require('./handle');
const QueryBuilder = require('../config/query_builder');
const { Error404 } = require('../errors/index');

class CheckIfExistHandler extends Handler {
  constructor(table_name, column) {
    super();
    this.table_name = table_name;
    this.column = column;
  }

  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const checkIfExist = await queryBuilder.findOne({
      table_name: this.table_name,
      where: [{ column: this.column, value: table[this.column] }],
    });
    if (!checkIfExist) {
      throw new Error404('Not Found');
    }
    return super.handle(table);
  }
}

module.exports = CheckIfExistHandler;
