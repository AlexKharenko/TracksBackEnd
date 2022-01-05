const QueryBuilder = require('../config/query_builder');

const TABLE_NAME = 'genres';
const QUERYBUILDER = new QueryBuilder();

exports.getGenres = async () => {
  const res = await QUERYBUILDER.find({
    table_name: TABLE_NAME,
    where: [],
  });
  return res;
};

exports.getGenreById = async (genre_id) => {
  const res = await QUERYBUILDER.findOne({
    table_name: TABLE_NAME,
    where: [{ column: 'genre_id', value: genre_id }],
  });
  return res;
};

// additional functions below

exports.createGenre = async (genre) => {
  try {
    await QUERYBUILDER.create({
      table_name: TABLE_NAME,
      columns: Object.keys(genre),
      values: Object.values(genre),
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateGenre = async (genre) => {
  const { genre_id, ...new_table } = genre;
  try {
    await QUERYBUILDER.update({
      table_name: TABLE_NAME,
      columns: Object.keys(new_table),
      values: Object.values(new_table),
      where: [{ column: 'genre_id', value: genre_id }],
    });
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteGenre = async (genre) => {
  try {
    await QUERYBUILDER.delete({
      table_name: TABLE_NAME,
      where: [{ column: 'genre_id', value: genre.genre_id }],
    });
  } catch (err) {
    throw new Error(err);
  }
};
