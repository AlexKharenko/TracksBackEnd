const BuilderIntrface = require('../builder_interface');
const Album = require('./album');

class AlbumBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.album = undefined;
  }

  reset() {
    this.album = new Album();
  }

  setId(id) {
    this.album.album_id = id;
  }

  setAlbumTitle(album_title) {
    this.album.album_title = album_title;
  }

  setDetails(details) {
    this.album.details = details;
  }

  setCoverUrl(cover_url) {
    this.album.cover_url = cover_url;
  }

  setCoverOnServer(cover_on_server) {
    this.album.cover_on_server = cover_on_server;
  }

  setAuthor(author) {
    this.album.author = author;
  }

  setTracks(tracks) {
    this.album.tracks = tracks;
  }

  setReleaseDate(release_date) {
    this.album.release_date = release_date;
  }

  getResult() {
    return this.album.getData();
  }
}

module.exports = AlbumBuilder;
