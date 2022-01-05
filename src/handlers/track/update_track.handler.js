const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class UpdateTrackHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artists, groups, track_id, ...new_table } = table;
    await queryBuilder.update({
      table_name: 'tracks',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      where: [{ column: 'track_id', value: track_id }],
    });
    return super.handle(table);
  }
}

module.exports = UpdateTrackHandler;
