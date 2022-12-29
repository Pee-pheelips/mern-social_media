import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

//API routes
import  userRoutes  from "./routes/user.routes.js";

//AUTH routes
import authRoutes from "./routes/auth.routes.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8001;
// const connection_url = "";

//API routes
app.use("/", userRoutes);

//auth routes
app.use("/", authRoutes);
//middlewares
app.use(express.json());
app.use(Cors());

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

//DB Config
// mongoose.connect(connection_url, (err) => {
//   if (err) throw err;
//   console.log("connected to MongoDB");
// });

//---testing server connection
// app.get("/", (req, res) => res.status(200).send("Hello world"));

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
