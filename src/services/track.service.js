const QueryBuilder = require('../config/query_builder');
const { Director, TrackBuilder } = require('../builder/index');
const handleError = require('../errors/handle_error');
const { Error404 } = require('../errors/index');
const {
  CreateAuthorsForTrackHandler,
  CreateTrackHandler,
  UpdateAuthorsForTrackHandler,
  UpdateTrackHandler,
  DeleteAuthorsForTrackHandler,
  DeleteTrackHandler,
} = require('../handlers/track/index');
const {
  Chain,
  SaveFileOnServerHandler,
  DeleteFileFromServerHandler,
  CheckIfExistHandler,
  CheckDTOMatchHandler,
  DeleteOldFileFromServerHandler,
} = require('../handlers/index');
const ArtistService = require('./artist.service');
const AlbumService = require('./album.service');
const GroupService = require('./group.service');

const TABLE_NAME = 'tracks';
const DIRECTOR = new Director();
const BUILDER = new TrackBuilder();
const QUERYBUILDER = new QueryBuilder();

const generateWhereStatement = (params) => {
  const whereStatement = [];
  if (params.genre) {
    const genres_string = params.genre.replace(/,/g, '');
    const genres = [...genres_string];
    genres.forEach((item) => {
      whereStatement.push({
        column: 'genre_id',
        value: item,
        or: true,
      });
    });
  }
  if (params.name) {
    whereStatement.push({
      column: 'title',
      value: `%${params.name}%`,
      comparator: 'ILIKE',
    });
  }
  return whereStatement;
};

const generateOrderByStatement = (params) => {
  const orderByStatement = {};
  if (params.up === '') {
    orderByStatement.desc = 'ASC';
  } else if (!params.up) {
    orderByStatement.desc = 'DESC';
  }
  if (params.date_added === '') {
    orderByStatement.column = 'date_added';
  } else if (params.release_date === '') {
    orderByStatement.column = 'release_date';
  } else if (params.abc === '') {
    orderByStatement.column = 'title';
  }
  return orderByStatement;
};

const setAuthors = async (track_id) => {
  const groups = await GroupService.getGroupsByTrackId(track_id);
  const artists = await ArtistService.getArtistsByTrackId(track_id);
  BUILDER.setArtists(artists);
  BUILDER.setGroups(groups);
};

exports.getTracks = async (params) => {
  const res = await QUERYBUILDER.find(
    {
      table_name: TABLE_NAME,
      where: generateWhereStatement(params),
      order_by: generateOrderByStatement(params),
      offset: params.offset || '',
      join: {
        column: 'genre_id',
        compare_table: 'genres',
        compare_column: 'genre_id',
      },
    },
    params.limit || ''
  );
  const tracks = [];
  for (let i = 0; i < res.length; i++) {
    DIRECTOR.makeSimpleTrack(BUILDER, res[i]);
    await setAuthors(res[i].track_id);
    tracks.push(BUILDER.getResult());
  }
  return tracks;
};

exports.getTrackById = async (track_id) => {
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [{ column: 'track_id', value: track_id }],
    join: {
      column: 'genre_id',
      compare_table: 'genres',
      compare_column: 'genre_id',
    },
  });
  if (!res) {
    throw new Error404('Not found');
  }
  const album = await AlbumService.getAlbumById(res.album_id, false);
  DIRECTOR.makeTrack(BUILDER, res);
  await setAuthors(res.track_id);
  BUILDER.setAlbum(album);
  const track = BUILDER.getResult();

  return track;
};

// additional functions below

exports.getTracksByAlbumId = async (album_id) => {
  const res = await QUERYBUILDER.find({
    table_name: TABLE_NAME,
    where: [{ column: 'album_id', value: album_id }],
  });
  const tracks = [];
  for (let i = 0; i < res.length; i++) {
    DIRECTOR.makeSimpleTrack(BUILDER, res[i]);
    await setAuthors(res[i].track_id);
    tracks.push(BUILDER.getResult());
  }
  return tracks;
};

exports.getTracksByAuthorId = async (author_id, is_group) => {
  const res = await QUERYBUILDER.find({
    table_name: 'track_authors',
    where: [
      { column: 'author_id', value: author_id },
      { column: 'is_group', value: is_group },
    ],
    join: {
      column: 'track_id',
      compare_table: 'tracks',
      compare_column: 'track_id',
    },
  });
  const tracks = [];
  if (res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      DIRECTOR.makeSimpleTrack(BUILDER, res[i]);
      await setAuthors(res[i].track_id);
      tracks.push(BUILDER.getResult());
    }
  }
  return tracks;
};

exports.createTrack = async (track, files) => {
  const handlers = [
    new CheckDTOMatchHandler('TrackDTO'),
    new SaveFileOnServerHandler('track_id', 'track_url', files.track_file),
    new SaveFileOnServerHandler('track_id', 'cover_url', files.cover_file),
    new CreateTrackHandler(),
    new CreateAuthorsForTrackHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(track);
  if (res) {
    handleError(res.err);
  }
};

exports.updateTrack = async (track, files) => {
  const handlers = [
    new CheckIfExistHandler('tracks', 'track_id'),
    new DeleteOldFileFromServerHandler(),
    new SaveFileOnServerHandler('track_id', 'track_url', files.track_file),
    new SaveFileOnServerHandler('track_id', 'cover_url', files.cover_file),
    new UpdateTrackHandler(),
    new UpdateAuthorsForTrackHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(track);
  if (res) {
    handleError(res.err);
  }
};

exports.deleteTrack = async (track) => {
  const handlers = [
    new CheckIfExistHandler('tracks', 'track_id'),
    new DeleteTrackHandler(),
    new DeleteAuthorsForTrackHandler(),
    new DeleteFileFromServerHandler('track_url'),
    new DeleteFileFromServerHandler('cover_url'),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(track);
  if (res) {
    handleError(res.err);
  }
};
