import app from "./app.js";
import connectDB from "./db/connectDB.js";

const startServer = async () => {
   await connectDB();
   app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
   });
};

export default startServer;
