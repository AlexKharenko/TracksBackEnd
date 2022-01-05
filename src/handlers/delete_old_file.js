const fs = require('fs');
const Handler = require('./handle');
const { Error400 } = require('../errors/index');

class DeleteOldFileFromServerHandler extends Handler {
  async handle(table) {
    const {
      old_cover_url,
      old_cover_on_server,
      old_track_url,
      old_track_on_server,
      ...new_table
    } = table;
    if (old_cover_url || old_track_url) {
      if (old_cover_on_server) {
        const path = `./src/public/uploads/${
          old_cover_url.split('/static')[1]
        }`;
        fs.unlink(path, (err) => {
          if (err) throw new Error400(err.message);
        });
      }
      if (old_track_on_server) {
        const path = `./src/public/uploads/${
          old_track_url.split('/static')[1]
        }`;
        fs.unlink(path, (err) => {
          if (err) throw new Error400(err.message);
        });
      }
    }
    return super.handle(new_table);
  }
}

module.exports = DeleteOldFileFromServerHandler;
