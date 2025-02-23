import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(
         `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}${process.env.MONGO_OPTIONS}`
      );
      console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
   } catch (error) {
      console.log(`❌ MongoDB connection failed: ${error}`);
      process.exit(1);
   }
};

export default connectDB;
