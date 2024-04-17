const express = require("express");
const jwt = require('jsonwebtoken')
const Movie = require("../models/movieModel");
const router = express.Router();
const {
  getAllMovies,
  getMoviesByPagination,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  addMovieUI,
  getMovieUI
} = require("../controllers/movieController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
// router.route("/AddMovie").get(addMovieUI);
router.route("/AllMovie").get(getMovieUI);
router.route('/displayAllMovie').get(getAllMovies);
router.route("/").get(getMoviesByPagination).post(validateToken,createMovie);
router.route("/:id").get(getMovie).put(validateToken,updateMovie).delete(validateToken,deleteMovie);


module.exports = router;
