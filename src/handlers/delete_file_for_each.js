const fs = require('fs');
const Handler = require('./handle');
const { Error400 } = require('../errors/index');

class DeleteFileForEachHandler extends Handler {
  async handle(tables) {
    tables.forEach((table) => {
      if (table.cover_url) {
        if (table.cover_on_server) {
          const path = `./src/public/uploads/${
            table.cover_url.split('/static')[1]
          }`;
          fs.unlink(path, (err) => {
            if (err) throw new Error400(err.message);
          });
        }
      }
      if (table.track_url) {
        if (table.track_on_server) {
          const path = `./src/public/uploads/${
            table.track_url.split('/static')[1]
          }`;
          fs.unlink(path, (err) => {
            if (err) throw new Error400(err.message);
          });
        }
      }
    });

    return super.handle();
  }
}

module.exports = DeleteFileForEachHandler;
