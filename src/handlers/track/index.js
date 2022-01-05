const CreateAuthorsForTrackHandler = require('./create_authors.handler');
const CreateTrackHandler = require('./create_track.handler');
const UpdateAuthorsForTrackHandler = require('./update_authors.handler');
const UpdateTrackHandler = require('./update_track.handler');
const DeleteAuthorsForTrackHandler = require('./delete_authors.handler');
const DeleteTrackNoAuthorsHandler = require('./delete_track_no_artists.handler');
const DeleteTrackHandler = require('./delete_track.handler');

module.exports = {
  CreateAuthorsForTrackHandler,
  CreateTrackHandler,
  UpdateAuthorsForTrackHandler,
  UpdateTrackHandler,
  DeleteAuthorsForTrackHandler,
  DeleteTrackHandler,
  DeleteTrackNoAuthorsHandler,
};
