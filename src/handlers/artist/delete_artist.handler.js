const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteArtistHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const deleted_table = await queryBuilder.delete({
      table_name: 'artists',
      where: [{ column: 'artist_id', value: table.artist_id }],
      returning: true,
    });
    await queryBuilder.delete({
      table_name: 'group_artists',
      where: [{ column: 'artist_id', value: table.artist_id }],
    });
    await queryBuilder.delete({
      table_name: 'track_authors',
      where: [
        { column: 'author_id', value: table.artist_id },
        { column: 'is_group', value: false },
      ],
    });
    await queryBuilder.delete({
      table_name: 'albums',
      where: [
        { column: 'author_id', value: table.artist_id },
        { column: 'is_group', value: false },
      ],
    });
    return super.handle(deleted_table);
  }
}

module.exports = DeleteArtistHandler;
