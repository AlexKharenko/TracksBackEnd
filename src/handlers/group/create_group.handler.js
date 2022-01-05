const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class CreateGroupHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artists, ...new_table } = table;
    const { group_id } = await queryBuilder.create({
      table_name: 'groups',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      returning: 'group_id',
    });
    artists.forEach(async (artist) => {
      await queryBuilder.create({
        table_name: 'group_artists',
        columns: ['group_id', 'artist_id'],
        values: [group_id, artist],
      });
    });
    return super.handle({ ...table, group_id });
  }
}

module.exports = CreateGroupHandler;
