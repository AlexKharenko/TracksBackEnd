const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteAuthorsForTrackHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { track_id } = table;
    await queryBuilder.delete({
      table_name: 'track_authors',
      where: [{ column: 'track_id', value: track_id }],
    });
    return super.handle(table);
  }
}

module.exports = DeleteAuthorsForTrackHandler;
