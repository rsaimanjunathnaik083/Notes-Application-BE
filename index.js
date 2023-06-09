const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/User.routes");
const { notesRouter } = require("./routes/Notes.routes");
const { authenticate } = require("./middlewares/authenticate.middleware.");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({origin: "*",}));
app.get("/", (req, res) => {res.send("Welcome To Notes App");});

app.use("/users", userRouter);
app.use(authenticate);
app.use("/notes", notesRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is running at port : ${process.env.port}`);
});