const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class UpdateAlbumHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { album_id, ...new_table } = table;
    await queryBuilder.update({
      table_name: 'albums',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      where: [{ column: 'album_id', value: album_id }],
    });
    return super.handle(table);
  }
}

module.exports = UpdateAlbumHandler;
