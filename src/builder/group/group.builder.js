const BuilderIntrface = require('../builder_interface');
const Group = require('./group');

class GroupBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.group = undefined;
  }

  reset() {
    this.group = new Group();
  }

  setId(id) {
    this.group.group_id = id;
  }

  setGroupName(group_name) {
    this.group.group_name = group_name;
  }

  setDetails(details) {
    this.group.details = details;
  }

  setCoverUrl(cover_url) {
    this.group.cover_url = cover_url;
  }

  setCoverOnServer(cover_on_server) {
    this.group.cover_on_server = cover_on_server;
  }

  setArtists(artists) {
    this.group.artists = artists;
  }

  setTracks(tracks) {
    this.group.tracks = tracks;
  }

  setAlbums(albums) {
    this.group.albums = albums;
  }

  getResult() {
    return this.group.getData();
  }
}

module.exports = GroupBuilder;
