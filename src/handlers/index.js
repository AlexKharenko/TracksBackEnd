const SaveFileOnServerHandler = require('./save_file');
const DeleteFileFromServerHandler = require('./delete_file');
const DeleteOldFileFromServerHandler = require('./delete_old_file');
const DeleteFileForEachHandler = require('./delete_file_for_each');
const CheckIfExistHandler = require('./check_exist');
const CheckDTOMatchHandler = require('./check_dto');

class Chain {
  constructor(handlers) {
    this.createChain(handlers);
  }

  createChain(handlers) {
    for (let i = 0; i < handlers.length - 1; i++) {
      handlers[i].setNextHandler(handlers[i + 1]);
    }
    const startIndex = 0;
    this.chain = handlers[startIndex];
  }

  async handle(req) {
    return this.chain.handle(req);
  }
}

module.exports = {
  Chain,
  SaveFileOnServerHandler,
  DeleteFileFromServerHandler,
  CheckIfExistHandler,
  CheckDTOMatchHandler,
  DeleteOldFileFromServerHandler,
  DeleteFileForEachHandler,
};
