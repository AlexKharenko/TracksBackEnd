const BuilderIntrface = require('../builder_interface');
const Track = require('./track');

class TrackBuilder extends BuilderIntrface {
  constructor() {
    super();
    this.track = undefined;
  }

  reset() {
    this.track = new Track();
  }

  setId(id) {
    this.track.track_id = id;
  }

  setTitle(title) {
    this.track.title = title;
  }

  setLyrics(lyrics) {
    this.track.lyrics = lyrics;
  }

  setCoverUrl(cover_url) {
    this.track.cover_url = cover_url;
  }

  setTrackUrl(track_url) {
    this.track.track_url = track_url;
  }

  setCoverOnServer(cover_on_server) {
    this.track.cover_on_server = cover_on_server;
  }

  setTrackOnServer(track_on_server) {
    this.track.track_on_server = track_on_server;
  }

  setReleaseDate(release_date) {
    this.track.release_date = release_date;
  }

  setGenre(genre_name, genre_id) {
    this.track.genre_name = genre_name;
    this.track.genre_id = genre_id;
  }

  setArtists(artists) {
    this.track.artists = artists;
  }

  setGroups(groups) {
    this.track.groups = groups;
  }

  setAlbum(album) {
    this.track.album = album;
  }

  setDuration(duration) {
    this.track.duration = duration;
  }

  getResult() {
    return this.track.getData();
  }
}

module.exports = TrackBuilder;
