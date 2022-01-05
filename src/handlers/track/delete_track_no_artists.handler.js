const Handler = require('../handle');
const QueryBuilder = require('../../config/query_builder');

class DeleteTrackNoAuthorsHandler extends Handler {
  async handle() {
    const queryBuilder = new QueryBuilder();
    const with_authors = await queryBuilder.find({
      table_name: 'track_authors',
      where: [],
      query: ['track_id'],
      distinct: true,
    });
    const track_ids = await queryBuilder.find({
      table_name: 'tracks',
      where: with_authors.map((track) => ({
        column: 'track_id',
        value: track.track_id,
        comparator: '!=',
      })),

      query: ['track_id'],
      distinct: true,
    });
    const deleted_tracks = await queryBuilder.delete({
      table_name: 'tracks',
      where: track_ids.map((track) => ({
        column: 'track_id',
        value: track.track_id,
      })),
      returning: true,
      def_ret: false,
    });
    return super.handle(deleted_tracks);
  }
}

module.exports = DeleteTrackNoAuthorsHandler;
