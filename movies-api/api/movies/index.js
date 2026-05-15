import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getGenres, getMovie, getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getMovieImages, getMovieReviews, getMovieCredits, getMovieRecommendations, getMovieWatchProviders } from '../tmdb-api'; 


const router = express.Router();

// movie routes to be added

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/nowplaying', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/toprated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/:id/images', asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

router.get('/:id/reviews', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
}));

router.get('/:id/credits', asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

router.get('/:id/recommendations', asyncHandler(async (req, res) => {
    const recommendations = await getMovieRecommendations(req.params.id);
    res.status(200).json(recommendations);
}));

router.get('/:id/watchproviders', asyncHandler(async (req, res) => {
    const watchProviders = await getMovieWatchProviders(req.params.id);
    res.status(200).json(watchProviders);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

export default router;
