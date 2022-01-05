const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class UpdateGroupHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artists, group_id, ...new_table } = table;
    await queryBuilder.update({
      table_name: 'groups',
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      where: [{ column: 'group_id', value: group_id }],
    });
    await queryBuilder.delete({
      table_name: 'group_artists',
      where: [{ column: 'group_id', value: table.group_id }],
    });
    artists.forEach(async (artist) => {
      await queryBuilder.create({
        table_name: 'group_artists',
        columns: ['group_id', 'artist_id'],
        values: [group_id, artist],
      });
    });
    return super.handle(table);
  }
}

module.exports = UpdateGroupHandler;
