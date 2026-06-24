import { MongoClient, ObjectId, Db, Collection } from 'mongodb';

// replace with env var
const connectionString = 'mongodb://localhost:27017/cmpt372';
const client = new MongoClient(connectionString);

let db: Db;
let usersCollection: Collection;

interface User {
    _id?: ObjectId;
    id?: number;
    name: string;
    age: number;
}

const helpers = {
    findAll: async (): Promise<User[]> => {
        const users = await usersCollection.find({}).toArray();
        return users as User[];
    },

    insertUser: async (user: Omit<User, '_id'>): Promise<void> => {
        await usersCollection.insertOne({
            name: user.name,
            age: user.age
        });
    },

    deleteUser: async (id: string): Promise<void> => {
        await usersCollection.deleteOne({ _id: new ObjectId(id) });
    },

    init: async (): Promise<void> => {
        try {
            await client.connect();
            db = client.db('cmpt372');
            usersCollection = db.collection('users');

            // Create indexes
            await usersCollection.createIndex({ name: 1 });
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            throw error;
        }
    },
};

export { helpers };
