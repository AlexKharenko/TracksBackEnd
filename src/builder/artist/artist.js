class Track {
  getData() {
    return {
      artist_id: this.artist_id,
      nick_name: this.nick_name,
      first_name: this.first_name,
      last_name: this.last_name,
      details: this.details,
      cover_url: this.cover_url,
      cover_on_server: this.cover_on_server,
      albums: this.albums,
      tracks: this.tracks,
      group: this.group,
      is_group: false,
    };
  }
}

module.exports = Track;
