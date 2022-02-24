import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`DB connection at ${conn.connection.host} successfull`.cyan.bold)
    } catch (error) {
        console.log("Connection to DB failed".red.bold, error)
        process.exit(1);
    }
}

export default dbConnect;
