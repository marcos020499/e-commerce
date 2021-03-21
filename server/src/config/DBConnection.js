import mongoose from 'mongoose';
import { config } from './constants';


export const DBConnection = () => {
  return mongoose.connect(config.DB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
});
};