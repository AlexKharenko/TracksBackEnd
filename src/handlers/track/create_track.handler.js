const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class CreateTrackHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artists, groups, ...new_table } = table;
    const { track_id } = await queryBuilder.create({
      table_name: 'tracks',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      returning: 'track_id',
    });
    return super.handle({ ...table, track_id });
  }
}

module.exports = CreateTrackHandler;
