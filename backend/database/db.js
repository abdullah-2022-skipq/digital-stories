import mongoose from 'mongoose';
import { MONGO_DB_LOCAL } from '../config';

const dbConnect = () => {
  mongoose.connect(MONGO_DB_LOCAL);
  const db = mongoose.connection;

  // eslint-disable-next-line no-console
  db.on('error', console.error.bind(console, 'connection error: '));

  db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log(`😄 Database connected on server ${MONGO_DB_LOCAL}`);
  });
};

export default dbConnect;
