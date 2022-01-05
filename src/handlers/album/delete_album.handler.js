const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteAlbumHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const deleted_table = await queryBuilder.delete({
      table_name: 'albums',
      where: [{ column: 'album_id', value: table.album_id }],
      returning: true,
    });
    await queryBuilder.update({
      table_name: 'tracks',
      where: [{ column: 'album_id', value: table.album_id }],
      columns: ['album_id'],
      values: [null],
    });
    return super.handle(deleted_table);
  }
}

module.exports = DeleteAlbumHandler;
