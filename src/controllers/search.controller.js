const SearchService = require('../services/search.service');

exports.searchAll = async (req, res) => {
  try {
    const search_result = await SearchService.searchAll(req.query);
    return res.status(200).json({ success: true, data: search_result });
  } catch (err) {
    return res
      .status(err.statusCode || 505)
      .json({ success: false, message: err.message });
  }
};
