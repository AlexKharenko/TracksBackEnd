const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class CreateArtistHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artist_id } = await queryBuilder.create({
      table_name: 'artists',
      columns: Object.keys(table),
      values: Object.values(table),
      returning: 'artist_id',
    });
    return super.handle({ ...table, artist_id });
  }
}

module.exports = CreateArtistHandler;
