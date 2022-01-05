class Director {
  makeTrack(builder, data) {
    builder.reset();
    builder.setId(data.track_id);
    builder.setTitle(data.title);
    builder.setLyrics(data.lyrics);
    builder.setCoverUrl(data.cover_url);
    builder.setTrackUrl(data.track_url);
    builder.setReleaseDate(data.release_date);
    builder.setCoverOnServer(data.cover_on_server);
    builder.setTrackOnServer(data.track_on_server);
    builder.setGenre(data.genre_name, data.genre_id);
    builder.setDuration(data.duration);
  }

  makeSimpleTrack(builder, data) {
    builder.reset();
    builder.setId(data.track_id);
    builder.setTitle(data.title);
    builder.setDuration(data.duration);
  }

  makeArtist(builder, data) {
    builder.reset();
    builder.setId(data.artist_id);
    builder.setNickName(data.nick_name);
    builder.setDetails(data.details);
    builder.setCoverUrl(data.cover_url);
    builder.setCoverOnServer(data.cover_on_server);
    builder.setFirstName(data.first_name);
    builder.setLastName(data.last_name);
  }

  makeSimpleArtist(builder, data) {
    builder.reset();
    builder.setId(data.artist_id);
    builder.setNickName(data.nick_name);
  }

  makeGroup(builder, data) {
    builder.reset();
    builder.setId(data.group_id);
    builder.setGroupName(data.group_name);
    builder.setCoverUrl(data.cover_url);
    builder.setCoverOnServer(data.cover_on_server);
    builder.setDetails(data.details);
  }

  makeSimpleGroup(builder, data) {
    builder.reset();
    builder.setId(data.group_id);
    builder.setGroupName(data.group_name);
  }

  makeAlbum(builder, data) {
    builder.reset();
    builder.setId(data.album_id);
    builder.setAlbumTitle(data.album_title);
    builder.setDetails(data.details);
    builder.setCoverOnServer(data.cover_on_server);
    builder.setCoverUrl(data.cover_url);
    builder.setReleaseDate(data.release_date);
  }

  makeSimpleAlbum(builder, data) {
    builder.reset();
    builder.setId(data.album_id);
    builder.setAlbumTitle(data.album_title);
    builder.setReleaseDate(data.release_date);
  }
}
module.exports = Director;
