const TrackService = require('./track.service');
const ArtistService = require('./artist.service');
const GroupService = require('./group.service');
const AlbumService = require('./album.service');

exports.searchAll = async (params) => {
  const search = {};
  search.artists = await ArtistService.getArtists(params);
  search.groups = await GroupService.getGroups(params);
  search.albums = await AlbumService.getAlbums(params);
  search.tracks = await TrackService.getTracks(params);
  return search;
};
