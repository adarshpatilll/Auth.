import app from "./app.js";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/auth.routes.js";
import startServer from "./server.js";

app.get("/", (req, res) => {
   res.send("Backend is running successfully! 🚀");
});

app.use("/api", router);

app.use(errorHandler);
startServer();
