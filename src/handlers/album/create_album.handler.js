const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class CreateAlbumHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { album_id } = await queryBuilder.create({
      table_name: 'albums',
      columns: Object.keys(table),
      values: Object.values(table),
      returning: 'album_id',
    });
    return super.handle({ ...table, album_id });
  }
}

module.exports = CreateAlbumHandler;
