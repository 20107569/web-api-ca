import express from 'express';
import Favourite from './favouriteModel';

const router = express.Router(); 

// Get all favourites
router.get('/', async (req, res) => {
    const favourites = await Favourite.find();
    res.status(200).json(favourites);
});

export default router;
