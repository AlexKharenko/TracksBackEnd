class Group {
  getData() {
    return {
      group_id: this.group_id,
      group_name: this.group_name,
      details: this.details,
      cover_url: this.cover_url,
      cover_on_server: this.cover_on_server,
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
      is_group: true,
    };
  }
}

module.exports = Group;
