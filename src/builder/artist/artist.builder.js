const BuilderIntrface = require('../builder_interface');
const Artist = require('./artist');

class ArtistBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.artist = undefined;
  }

  reset() {
    this.artist = new Artist();
  }

  setId(id) {
    this.artist.artist_id = id;
  }

  setNickName(nick_name) {
    this.artist.nick_name = nick_name;
  }

  setFirstName(first_name) {
    this.artist.first_name = first_name;
  }

  setLastName(last_name) {
    this.artist.last_name = last_name;
  }

  setDetails(details) {
    this.artist.details = details;
  }

  setCoverUrl(cover_url) {
    this.artist.cover_url = cover_url;
  }

  setCoverOnServer(cover_on_server) {
    this.artist.cover_on_server = cover_on_server;
  }

  setTracks(tracks) {
    this.artist.tracks = tracks;
  }

  setAlbums(albums) {
    this.artist.albums = albums;
  }

  setGroup(group) {
    this.artist.group = group;
  }

  getResult() {
    return this.artist.getData();
  }
}

module.exports = ArtistBuilder;
