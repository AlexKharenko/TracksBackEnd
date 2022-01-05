const QueryBuilder = require('../config/query_builder');
const { Director, ArtistBuilder } = require('../builder/index');
const handleError = require('../errors/handle_error');
const TrackService = require('./track.service');
const AlbumService = require('./album.service');
const GroupService = require('./group.service');

const { DeleteTrackNoAuthorsHandler } = require('../handlers/track/index');
const {
  CreateArtistHandler,
  UpdateArtistHandler,
  DeleteArtistHandler,
} = require('../handlers/artist/index');
const {
  Chain,
  SaveFileOnServerHandler,
  DeleteFileFromServerHandler,
  DeleteFileForEachHandler,
  CheckIfExistHandler,
  CheckDTOMatchHandler,
  DeleteOldFileFromServerHandler,
} = require('../handlers/index');

const TABLE_NAME = 'artists';
const DIRECTOR = new Director();
const BUILDER = new ArtistBuilder();
const QUERYBUILDER = new QueryBuilder();

const generateWhereStatement = (params) => {
  const whereStatement = [];
  if (params.name) {
    whereStatement.push({
      column: 'nick_name',
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
  if (params.artist_nick === '') {
    orderByStatement.column = 'nick_name';
  }
  return orderByStatement;
};

exports.getArtists = async (params) => {
  const res = await QUERYBUILDER.find(
    {
      table_name: TABLE_NAME,
      where: generateWhereStatement(params),
      order_by: generateOrderByStatement(params),
      offset: params.offset || '',
    },
    params.limit || ''
  );
  const artists = [];
  res.forEach((item) => {
    DIRECTOR.makeSimpleArtist(BUILDER, item);
    const { tracks, group, ...artist } = BUILDER.getResult();
    artists.push(artist);
  });
  return artists;
};

exports.getArtistById = async (artist_id, full_data = true, simple = false) => {
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [{ column: 'artist_id', value: artist_id }],
  });
  if (simple) DIRECTOR.makeSimpleArtist(BUILDER, res);
  else if (!full_data) {
    DIRECTOR.makeArtist(BUILDER, res);
  } else {
    const group = await GroupService.getGroupByArtistId(artist_id);
    const albums = await AlbumService.getAlbumsByAuthorId(artist_id, false);
    const tracks = await TrackService.getTracksByAuthorId(artist_id, false);
    DIRECTOR.makeArtist(BUILDER, res);
    BUILDER.setTracks(tracks);
    BUILDER.setAlbums(albums);
    BUILDER.setGroup(group);
  }
  const artist = BUILDER.getResult();
  return artist;
};

// additional functions below

exports.getArtistsByTrackId = async (track_id) => {
  const res = await QUERYBUILDER.find({
    table_name: 'track_authors',
    where: [
      {
        column: 'track_id',
        value: `${track_id}`,
        comparator: '=',
      },
      {
        column: 'is_group',
        value: false,
        comparator: '=',
      },
    ],
    join: {
      column: 'author_id',
      compare_table: TABLE_NAME,
      compare_column: 'artist_id',
    },
    join_type: 'INNER JOIN',
  });
  const artists = [];
  res.forEach((item) => {
    DIRECTOR.makeSimpleArtist(BUILDER, item);
    artists.push(BUILDER.getResult());
  });
  return artists || [];
};

exports.getArtistsByGroupId = async (group_id) => {
  const res = await QUERYBUILDER.find({
    table_name: 'group_artists',
    where: [
      {
        column: 'group_id',
        value: `${group_id}`,
        comparator: '=',
      },
    ],
    join: {
      column: 'artist_id',
      compare_table: TABLE_NAME,
      compare_column: 'artist_id',
    },
  });
  const artists = [];
  res.forEach((item) => {
    DIRECTOR.makeSimpleArtist(BUILDER, item);
    artists.push(BUILDER.getResult());
  });
  return artists;
};

exports.createArtist = async (artist, files) => {
  const handlers = [
    new CheckDTOMatchHandler('ArtistDTO'),
    new SaveFileOnServerHandler('artist_id', 'cover_url', files.cover_file),
    new CreateArtistHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(artist);
  if (res) {
    handleError(res.err);
  }
};

exports.updateArtist = async (artist, files) => {
  const handlers = [
    new CheckIfExistHandler('artists', 'artist_id'),
    new DeleteOldFileFromServerHandler(),
    new SaveFileOnServerHandler('artist_id', 'cover_url', files.cover_file),
    new UpdateArtistHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(artist);
  if (res) {
    handleError(res.err);
  }
};

exports.deleteArtist = async (artist) => {
  const handlers = [
    new CheckIfExistHandler('artists', 'artist_id'),
    new DeleteArtistHandler(),
    new DeleteFileFromServerHandler('cover_url'),
    new DeleteTrackNoAuthorsHandler(),
    new DeleteFileForEachHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(artist);
  if (res) {
    handleError(res.err);
  }
};
