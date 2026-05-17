import express from 'express';
import Favourite from './favouriteModel';

const router = express.Router(); 

// Get all favourites
router.get('/', async (req, res) => {
    const favourites = await Favourite.find();
    res.status(200).json(favourites);
});

// Add favourite
router.post('/', async (req, res) => {
    const favourite = await Favourite.create(req.body);
    res.status(201).json(favourite);
});

// Delete favourite
router.delete('/:id', async (req, res) => {
    await Favourite.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true});
});

export default router;
