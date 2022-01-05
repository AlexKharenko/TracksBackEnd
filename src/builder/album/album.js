class Album {
  getData() {
    return {
      album_id: this.album_id,
      album_title: this.album_title,
      author: this.author,
      details: this.details,
      cover_url: this.cover_url,
      release_date: this.release_date,
      tracks: this.tracks,
    };
  }
}

module.exports = Album;
