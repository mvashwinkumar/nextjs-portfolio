import { MongoClient, ConnectOptions } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options: ConnectOptions = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
};

// TODO: Implement connection pooling and retry logic
let client: MongoClient;
let clientPromise: Promise<MongoClient>;