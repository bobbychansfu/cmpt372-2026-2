import mongoose from 'mongoose';

// replace with env var
const mongoDbPath = 'mongodb://localhost:27017/cmpt372';  

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    }
});

// Pic schema - not used in this project, but included for your reference
const picSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Buffer
});

// Models
const User = mongoose.model('User', userSchema);

interface UserDoc {
    _id?: string;
    name: string;
    age: number;
}

const helpers = {
    findAll: async (): Promise<UserDoc[]> => {
        const users = await User.find({}).lean();
        return users.map((user) => ({
            _id: user._id.toString(),
            name: user.name,
            age: user.age
        }));
    },

    insertUser: async (user: Omit<UserDoc, '_id'>): Promise<void> => {
        await User.create({
            name: user.name,
            age: user.age
        });
    },

    deleteUser: async (id: string): Promise<void> => {
        await User.findByIdAndDelete(id);
    },

    init: async (): Promise<void> => {
        try {
            await mongoose.connect(mongoDbPath, {
                maxPoolSize: 10
            } as mongoose.ConnectOptions);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection failed:', error);
            throw error;
        }
    },
};

export { helpers };
