const QueryBuilder = require('../config/query_builder');
const { Director, GroupBuilder } = require('../builder/index');
const handleError = require('../errors/handle_error');
const TrackService = require('./track.service');
const ArtistService = require('./artist.service');
const AlbumService = require('./album.service');
const { DeleteTrackNoAuthorsHandler } = require('../handlers/track/index');
const {
  CreateGroupHandler,
  UpdateGroupHandler,
  DeleteGroupHandler,
} = require('../handlers/group/index');
const {
  Chain,
  SaveFileOnServerHandler,
  DeleteFileFromServerHandler,
  CheckIfExistHandler,
  CheckDTOMatchHandler,
  DeleteOldFileFromServerHandler,
  DeleteFileForEachHandler,
} = require('../handlers/index');

const TABLE_NAME = 'groups';
const DIRECTOR = new Director();
const BUILDER = new GroupBuilder();
const QUERYBUILDER = new QueryBuilder();

const generateWhereStatement = (params) => {
  const whereStatement = [];
  if (params.name) {
    whereStatement.push({
      column: 'group_name',
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
  if (params.group_name === '') {
    orderByStatement.column = 'group_name';
  }
  return orderByStatement;
};

exports.getGroups = async (params) => {
  const res = await QUERYBUILDER.find(
    {
      table_name: TABLE_NAME,
      where: generateWhereStatement(params),
      order_by: generateOrderByStatement(params),
      offset: params.offset || '',
    },
    params.limit || ''
  );
  const groups = [];
  res.forEach((item) => {
    DIRECTOR.makeSimpleGroup(BUILDER, item);
    const { artists, tracks, ...group } = BUILDER.getResult();
    groups.push(group);
  });
  return groups;
};

exports.getGroupById = async (group_id, full_data = true, simple = false) => {
  const res = await QUERYBUILDER.findOne({
    table_name: 'groups',
    where: [
      {
        column: 'group_id',
        value: `${group_id}`,
      },
    ],
  });
  if (res) {
    if (simple) DIRECTOR.makeSimpleGroup(BUILDER, res);
    else if (!full_data) {
      DIRECTOR.makeGroup(BUILDER, res);
    } else {
      const tracks = await TrackService.getTracksByAuthorId(group_id, true);
      const artists = await ArtistService.getArtistsByGroupId(res.group_id);
      const albums = await AlbumService.getAlbumsByAuthorId(group_id, true);
      DIRECTOR.makeGroup(BUILDER, res);
      BUILDER.setArtists(artists);
      BUILDER.setTracks(tracks);
      BUILDER.setAlbums(albums);
    }

    const group = BUILDER.getResult();
    return group;
  }
  return {};
};

// additional function below

exports.getGroupsByTrackId = async (track_id) => {
  const res = await QUERYBUILDER.find({
    table_name: 'track_authors',
    where: [
      {
        column: 'track_id',
        value: `${track_id}`,
      },
      {
        column: 'is_group',
        value: true,
      },
    ],
    join: {
      column: 'author_id',
      compare_table: TABLE_NAME,
      compare_column: 'group_id',
    },
  });
  const groups = [];
  res.forEach((item) => {
    const artists = ArtistService.getArtistsByGroupId(item.group_id);
    DIRECTOR.makeSimpleGroup(BUILDER, item);
    BUILDER.setArtists(artists);
    groups.push(BUILDER.getResult());
  });
  return groups;
};

exports.getGroupByArtistId = async (artist_id) => {
  const res = await QUERYBUILDER.findOne({
    table_name: 'group_artists',
    where: [
      {
        column: 'artist_id',
        value: `${artist_id}`,
      },
    ],
    join: {
      column: 'group_id',
      compare_table: TABLE_NAME,
      compare_column: 'group_id',
    },
  });
  if (res) {
    DIRECTOR.makeSimpleGroup(BUILDER, res);
    const group = BUILDER.getResult();
    return group;
  }
  return '';
};

exports.createGroup = async (group, files) => {
  const handlers = [
    new CheckDTOMatchHandler('GroupDTO'),
    new SaveFileOnServerHandler('group_id', 'cover_url', files.cover_file),
    new CreateGroupHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(group);
  if (res) {
    handleError(res.err);
  }
};

exports.updateGroup = async (group, files) => {
  const handlers = [
    new CheckIfExistHandler('groups', 'group_id'),
    new DeleteOldFileFromServerHandler(),
    new SaveFileOnServerHandler('group_id', 'cover_url', files.cover_file),
    new UpdateGroupHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(group);
  if (res) {
    handleError(res.err);
  }
};

exports.deleteGroup = async (group) => {
  const handlers = [
    new CheckIfExistHandler('groups', 'group_id'),
    new DeleteGroupHandler(),
    new DeleteFileFromServerHandler('cover_url'),
    new DeleteTrackNoAuthorsHandler(),
    new DeleteFileForEachHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(group);
  if (res) {
    handleError(res.err);
  }
};
