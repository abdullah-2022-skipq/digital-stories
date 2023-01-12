import mongoose from 'mongoose';
import { MONGO_DB_LOCAL } from '../config';

const dbConnect = () => {
  mongoose.connect(MONGO_DB_LOCAL);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error: '));

  db.once('open', () => {
    console.log(`😄 Database connected on server ${MONGO_DB_LOCAL}`);
  });
};

export default dbConnect;
