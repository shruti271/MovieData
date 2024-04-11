const express = require("express");
const asyncHandler = require("express-async-handler");
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
  addMovieUI  
} = require("../controllers/movieController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);
router.route("/AddMovie").get(addMovieUI)
router.route("/").get(getMoviesByPagination).post(createMovie);
router.route("/:id").get(getMovie).put(validateToken,updateMovie).delete(validateToken,deleteMovie);


module.exports = router;
