class Track {
  getData() {
    return {
      track_id: this.track_id,
      title: this.title,
      lyrics: this.lyrics,
      cover_url: this.cover_url,
      track_url: this.track_url,
      cover_on_server: this.cover_on_server,
      track_on_server: this.track_on_server,
      release_date: this.release_date,
      genre_id: this.genre_id,
      genre_name: this.genre_name,
      artists: this.artists,
      groups: this.groups,
      album: this.album,
      duration: this.duration,
    };
  }
}

module.exports = Track;
