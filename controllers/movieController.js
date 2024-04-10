const asyncHandler = require("express-async-handler");
const Movie = require("../models/movieModel");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//@desc Get all Movies
//@route GET /api/Movies
//@access private
const getAllMovies = asyncHandler(async (req, res) => {
  const Movies = await Movie.find({});
  res.status(200).json(Movies);
});

//@desc Get all Movies
//@route GET /api/Movies
//@access private
const getMoviesByPagination = asyncHandler(async (req, res) => {
  console.table(req.query);
  const page = Number(req?.query?.page);
  const perPage = Number(req?.query?.perpage);

  const Movies = await Movie.find({})
    .skip((page - 1) * perPage)
    .limit(perPage);
  res
    .status(200)
    .json({
      status: 200,
      data: Movies,
      message: "All data successfully retrived",
    });
});

//movie UI controller
const addMovieUI = asyncHandler(async (req, res) => {
  res.render("movie", {
    errorMsg: "",
  });
});

//@desc Create New Movie
//@route POST /api/Movies
//@access private
const createMovie = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const data = req.body;

  // if (!name || !email || !phone) {
  //   res.status(400);
  //   throw new Error("All fields are mandatory !");
  // }
  const addedMovie = await Movie.create({
    data,
    // user_id: req.user.id,
  });

  res.status(201).json(addedMovie);

  const verifyToken = asyncHandler((req, res, next) => {
    // Check if token is present in request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "Access denied. Token missing." });
    }

    // Extract token from the Authorization header
    const accessToken = token.split(" ")[1]; // Assuming token format is "Bearer <token>"

    // Verify the token
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          console.log("Error verifying token:", err);
          return res
            .status(403)
            .json({ message: "Access denied. Invalid token." });
        } else {
          // If token is valid, attach decoded token to request object
          req.decoded = decoded;
          next(); // Proceed to the next middleware or route handler
        }
      }
    );
  });
});



//@desc Get Movie
//@route GET /api/Movies/:id
//@access private
const getMovie = asyncHandler(async (req, res) => {
  let validId = req?.params?.id;

  const MovieById = await Movie.findById(validId);
  if (!MovieById) {
    res.status(404);
    throw new Error("Movie not found");
  }
  res
    .status(200)
    .json({
      status: 200,
      data: MovieById,
      message: "Movie retrived by ID " + req.params.id,
    });
});

//@desc Update Movie
//@route PUT /api/Movies/:id
//@access private
const updateMovie = asyncHandler(async (req, res) => {
  const oldMovie = await Movie.findById(req.params.id);
  if (!oldMovie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  // if (oldMovie.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user Movies");
  // }

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedMovie);
});

//@desc Delete Movie
//@route DELETE /api/Movies/:id
//@access private
const deleteMovie = asyncHandler(async (req, res) => {
  const MovieData = await Movie.findById(req.params.id);
  if (!Movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  // if (MovieData.user_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other user Movies");
  // }
  await Movie.deleteOne({ _id: req.params.id });
  res.status(200).json({status:400,data:MovieData,message:"successfully deleted"});
});

module.exports = {
  getAllMovies,
  getMoviesByPagination,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  addMovieUI,  
};
