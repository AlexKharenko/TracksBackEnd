const { getAudioDurationInSeconds } = require('get-audio-duration');
require('dotenv').config();
const Handler = require('./handle');
const { Error400, Error500 } = require('../errors/index');

class SaveFileOnServerHandler extends Handler {
  constructor(id_name, column, file) {
    super();
    this.id_name = id_name;
    this.column = column;
    this.file = file;
    this.call_path = `${process.env.URL}/static/`;
    this.path = 'src/public/uploads/';
  }

  async handle(table) {
    let res_table = table;
    const timestamp = Date.now();
    if (this.column === 'cover_url') {
      const { cover_url, ...new_table } = table;
      if (table.cover_on_server) {
        if (this.file === undefined) {
          throw new Error400('No file');
        }
        const file_name = `${timestamp}${this.id_name.split('_')[0]}.${
          this.file.name.split('.')[1]
        }`;
        const file_path = `${this.path}covers/${file_name}`;
        new_table.cover_url = `${this.call_path}covers/${file_name}`;
        this.file.mv(file_path, (err) => {
          if (err) {
            throw new Error500('Error of adding new file');
          }
        });
        res_table = new_table;
      } else if (!cover_url) {
        return super.handle(res_table);
      }
    }
    if (this.column === 'track_url') {
      const { track_url, ...new_table } = table;
      if (table.track_on_server) {
        if (this.file === undefined) {
          throw new Error400('No file');
        }
        const file_name = `${timestamp}${this.id_name.split('_')[0]}.${
          this.file.name.split('.')[1]
        }`;
        const file_path = `${this.path}tracks/${file_name}`;
        new_table.track_url = `${this.call_path}tracks/${file_name}`;
        this.file.mv(file_path, (err) => {
          if (err) {
            throw new Error500('Error of adding new file');
          }
        });
        const duration = await getAudioDurationInSeconds(file_path);
        new_table.duration = Math.floor(duration);
        res_table = new_table;
      } else {
        if (!track_url) {
          return super.handle(res_table);
        }
        const duration = await getAudioDurationInSeconds(table.track_url);
        res_table.duration = Math.floor(duration);
      }
    }

    return super.handle(res_table);
  }
}

module.exports = SaveFileOnServerHandler;
