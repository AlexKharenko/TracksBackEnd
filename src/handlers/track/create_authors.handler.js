const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class CreateAuthorsForTrackHandler extends Handler {
  async handle(table) {
    const queryBuilder = new QueryBuilder();
    const { artists, groups, track_id } = table;
    artists.forEach(async (artist) => {
      await queryBuilder.create({
        table_name: 'track_authors',
        columns: ['track_id', 'author_id', 'is_group'],
        values: [track_id, artist, false],
      });
    });
    groups.forEach(async (group) => {
      await queryBuilder.create({
        table_name: 'track_authors',
        columns: ['track_id', 'author_id', 'is_group'],
        values: [track_id, group, true],
      });
    });
    return super.handle(table);
  }
}

module.exports = CreateAuthorsForTrackHandler;
