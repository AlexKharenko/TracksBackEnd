const fs = require('fs');
const Handler = require('./handle');
const { Error400 } = require('../errors/index');

class DeleteFileFromServerHandler extends Handler {
  constructor(column) {
    super();
    this.column = column;
  }

  async handle(table) {
    if (table.cover_url || table.track_url) {
      if (this.column === 'cover_url') {
        if (table.cover_on_server) {
          const path = `./src/public/uploads/${
            table.cover_url.split('/static')[1]
          }`;
          fs.unlink(path, (err) => {
            if (err) throw new Error400(err.message);
          });
        }
      }
      if (this.column === 'track_url') {
        if (table.track_on_server) {
          const path = `./src/public/uploads/${
            table.track_url.split('/static')[1]
          }`;
          fs.unlink(path, (err) => {
            if (err) throw new Error400(err.message);
          });
        }
      }
    }
    return super.handle(table);
  }
}

module.exports = DeleteFileFromServerHandler;
