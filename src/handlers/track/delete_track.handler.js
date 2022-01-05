const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteTrackHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const deleted_table = await queryBuilder.delete({
      table_name: 'tracks',
      where: [{ column: 'track_id', value: table.track_id }],
      returning: true,
    });
    return super.handle(deleted_table);
  }
}

module.exports = DeleteTrackHandler;
