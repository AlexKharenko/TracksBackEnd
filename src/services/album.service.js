const QueryBuilder = require('../config/query_builder');
const { Director, AlbumBuilder } = require('../builder/index');
const handleError = require('../errors/handle_error');
const TrackService = require('./track.service');
const ArtistService = require('./artist.service');
const GroupService = require('./group.service');
const {
  CreateAlbumHandler,
  UpdateAlbumHandler,
  DeleteAlbumHandler,
} = require('../handlers/album/index');
const {
  Chain,
  SaveFileOnServerHandler,
  DeleteFileFromServerHandler,
  CheckIfExistHandler,
  CheckDTOMatchHandler,
  DeleteOldFileFromServerHandler,
} = require('../handlers/index');

const TABLE_NAME = 'albums';
const DIRECTOR = new Director();
const BUILDER = new AlbumBuilder();
const QUERYBUILDER = new QueryBuilder();

const generateWhereStatement = (params) => {
  const whereStatement = [];
  if (params.name) {
    whereStatement.push({
      column: 'album_title',
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
  if (params.album_name === '') {
    orderByStatement.column = 'album_title';
  } else if (params.release_date === '') {
    orderByStatement.column = 'release_date';
  }
  return orderByStatement;
};

const setAuthor = async (author_id, is_group) => {
  let author = {};
  if (is_group) {
    author = await GroupService.getGroupById(author_id, false, true);
  } else {
    author = await ArtistService.getArtistById(author_id, false, true);
  }
  BUILDER.setAuthor(author);
};

exports.getAlbums = async (params) => {
  const res = await QUERYBUILDER.find({
    table_name: TABLE_NAME,
    where: generateWhereStatement(params),
    order_by: generateOrderByStatement(params),
    offset: params.offset || '',
    limit: params.limit || '',
  });
  const groups = [];
  for (let i = 0; i < res.length; i++) {
    DIRECTOR.makeSimpleAlbum(BUILDER, res[i]);
    await setAuthor(res[i].author_id, res[i].is_group);
    groups.push(BUILDER.getResult());
  }
  return groups;
};

exports.getAlbumById = async (album_id, full_data = true) => {
  if (!album_id) return '';
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [
      {
        column: 'album_id',
        value: `${album_id}`,
      },
    ],
  });
  if (res) {
    DIRECTOR.makeAlbum(BUILDER, res);
    if (full_data) {
      const tracks = await TrackService.getTracksByAlbumId(res.album_id);
      BUILDER.setTracks(tracks);
    }
    await setAuthor(res.author_id, res.is_group);
    const album = BUILDER.getResult();
    return album;
  }
  return {};
};

// additional functions below

exports.getAlbumsByAuthorId = async (author_id, is_group) => {
  const res = await QUERYBUILDER.find({
    table_name: TABLE_NAME,
    where: [
      {
        column: 'author_id',
        value: author_id,
      },
      {
        column: 'is_group',
        value: is_group,
      },
    ],
  });
  const albums = [];
  for (let i = 0; i < res.length; i++) {
    DIRECTOR.makeSimpleAlbum(BUILDER, res[i]);
    await setAuthor(res[i].author_id, res[i].is_group);
    albums.push(BUILDER.getResult());
  }
  return albums;
};

exports.createAlbum = async (album, files) => {
  const handlers = [
    new CheckDTOMatchHandler('AlbumDTO'),
    new SaveFileOnServerHandler('album_id', 'cover_url', files.cover_file),
    new CreateAlbumHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(album);
  if (res) {
    handleError(res.err);
  }
};

exports.updateAlbum = async (album, files) => {
  const handlers = [
    new CheckIfExistHandler('albums', 'album_id'),
    new DeleteOldFileFromServerHandler(),
    new SaveFileOnServerHandler('album_id', 'cover_url', files.cover_file),
    new UpdateAlbumHandler(),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(album);
  if (res) {
    handleError(res.err);
  }
};

exports.deleteAlbum = async (album) => {
  const handlers = [
    new CheckIfExistHandler('albums', 'album_id'),
    new DeleteAlbumHandler(),
    new DeleteFileFromServerHandler('cover_url'),
  ];
  const chain = new Chain(handlers);
  const res = await chain.handle(album);
  if (res) {
    handleError(res.err);
  }
};
