const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class UpdateArtistHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artist_id, ...new_table } = table;
    await queryBuilder.update({
      table_name: 'artists',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      where: [{ column: 'artist_id', value: artist_id }],
    });
    return super.handle(table);
  }
}

module.exports = UpdateArtistHandler;
