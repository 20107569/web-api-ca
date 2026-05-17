import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userName: String,
  movieId:  Number,
  title:  String,
  poster_path: String
});

export default mongoose.model('Favourite', FavouriteSchema);
