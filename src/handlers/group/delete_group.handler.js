const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteGroupHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const deleted_table = await queryBuilder.delete({
      table_name: 'groups',
      where: [{ column: 'group_id', value: table.group_id }],
      returning: true,
    });
    await queryBuilder.delete({
      table_name: 'group_artists',
      where: [{ column: 'group_id', value: table.group_id }],
    });
    await queryBuilder.delete({
      table_name: 'track_authors',
      where: [
        { column: 'author_id', value: table.group_id },
        { column: 'is_group', value: true },
      ],
    });
    await queryBuilder.delete({
      table_name: 'albums',
      where: [
        { column: 'author_id', value: table.group_id },
        { column: 'is_group', value: true },
      ],
    });
    return super.handle(deleted_table);
  }
}

module.exports = DeleteGroupHandler;
